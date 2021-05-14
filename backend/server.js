const http = require('http');
const express = require('express');
const fs = require('fs');
const parser = require('body-parser');
const app = require('express')();
const exec = require('child_process').exec;
const path = require('path');
const icons = require("./random_icon.js");
const zip = require('express-easy-zip');
const cookieParser = require('cookie-parser');

const makejson = require("./random_json.js");
const modStrings = require("./mod_strings.js");
const modTreeJson = require("./mod_civTechTree.js");

const hostname = 'localhost';
const port = 3000;

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(
  parser.urlencoded({
    extended: false,
    limit: 1024,
  })
);

app.use(zip());
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.static('public/aoe2techtree'));

function os_func() {
  this.execCommand = function(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
	console.log(`stdout: ${stdout}`);
        console.error(`exec error: ${error}`);
        return;
      }
      callback();
    });
  }
}

var os = new os_func();

const createDraft = (req, res, next) => {
	var raw_data = fs.readFileSync('./database.json');
	var data = JSON.parse(raw_data);
	var drafts = data['drafts'];
	var uniqueID = false;
	var id;
	while (uniqueID == false) {
		id = '';
		for (var i=0; i < 15; i++) {
			var rand = Math.floor(Math.random() * 10);
			id += rand;
		}
		uniqueID = true;
		for (var i=0; i<drafts.length; i++) {
			if (drafts[i]['id'] == id) {
				uniqueID = false;
			}
		}
	}

	var draft = {};
	draft['id'] = id;

	var preset = {};
	preset['slots'] = parseInt(req.body.num_players, 10);
	preset['speed'] = req.body.draft_speed;
	preset['vanilla'] = req.body.new_bonuses;
	preset['points'] = parseInt(req.body.techtree_currency, 10);
	draft['preset'] = preset;

	var players = [];
	for (var i=0; i<parseInt(req.body.num_players, 10); i++) {
		var player = {};
		player['name'] = ''
		player['ready'] = 0
		//Units, buildings, techs
		player['tree'] = [
		        [13, 17, 21, 74, 545, 539, 331, 125, 83, 128],
		        [12, 45, 49, 50, 68, 70, 72, 79, 82, 84, 87, 101, 103, 104, 109, 199, 209, 276, 562, 584, 598, 621, 792],
		        [22, 101, 102, 103, 408]
		]
		player['alias'] = ''
		//Palette (color1, color2, color3), division, overlay, symbol
		player['flag_palette'] = [3, 4, 5, 6, 7, 3, 3, 3]
		players.push(player);
	}
	draft['players'] = players;

	var gamestate = {};
	gamestate['phase'] = 0;
	draft['gamestate'] = gamestate;
	drafts.push(draft);
        fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
	req.playerlink = 'https://krakenmeister.com/draft/player/' + id;
	req.hostlink = 'https://krakenmeister.com/draft/host/' + id;
	req.spectatorlink = 'https://krakenmeister.com/draft/' + id;
	next();
}

const checkCookies = (req, res, next) => {
	if ((req.cookies['draftID']) && (req.cookies['draftID'] == parseInt(req.params.id, 10)) && (req.cookies['playerNumber']) && (req.cookies['playerNumber'] >= 0)) {
		req.authenticated = -1;
	}
	next();
}

const authenticateDraft = (req, res, next) => {
	if (req.authenticated == -1) {
		return next();
	}
	var raw_data = fs.readFileSync('./database.json');
	var data = JSON.parse(raw_data);
	var drafts = data['drafts'];
	req.authenticated = 0;
	for (var i=0; i<drafts.length; i++) {
		if (drafts[i]['id'] == req.params.id) {
			req.authenticated = 1;
		}
	}
	next();
}

const setID = (req, res, next) => {
	req.params.id = req.body.draftID;
	next();
}

const checkSpace = (req, res, next) => {
	if (req.authenticated == -1) {
		return next();
	}
	var raw_data = fs.readFileSync('./database.json');
	var data = JSON.parse(raw_data);
	var drafts = data['drafts'];
	var index = -1;
	for (var i=0; i<drafts.length; i++) {
		if (drafts[i]['id'] == req.body.draftID) {
			index = i;
		}
	}
	if (index == -1) {
		console.log('Draft authentication failed');
		return next();
	}
	if (req.body.joinType == 0) {
		if (drafts[index]['players'][0]['name'] == '') {
			drafts[index]['players'][0]['name'] = req.body.civ_name;
		        fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
			req.playerNumber = 0;
		} else {
			req.authenticated = 2;
		}
		next();
	} else {
		for (var i=1; i<drafts[index]['preset']['slots']; i++) {
			if (drafts[index]['players'][i]['name'] == '') {
				drafts[index]['players'][i]['name'] = req.body.civ_name;
				req.playerNumber = i;
			        fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
				return next();
			}
		}
		req.authenticated = 3;
		next();
	}
}

const createModFolder = (req, res, next) => {
	os.execCommand(`sh createModFolder.sh ./modding/requested_mods ${req.body.seed}`, function() {
		next();
	});
}

const createCivIcons = (req, res, next) => {
	icons.generateFlags(`./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/widgetui/textures/menu/civs`, `./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/widgetui/textures/ingame/icons/civ_techtree_buttons`, `./public`);
	next();
}

const copyCivIcons = (req, res, next) => {
	os.execCommand(`cp -r ./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/widgetui/textures/ingame/icons/civ_techtree_buttons/. ./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/resources/_common/wpfg/resources/civ_techtree`, function() {
		next();
	});
}

const generateJson = (req, res, next) => {
	makejson.createJson(`./modding/requested_mods/${req.body.seed}/data.json`);
	next();
}

const writeNames = (req, res, next) => {
	modStrings.interperateLanguage(`./modding/requested_mods/${req.body.seed}/data.json`, `./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/resources/en/strings/key-value/key-value-modded-strings-utf8.txt`);
	next();
}

const writeUUIcons = (req, res, next) => {
	const iconids = ['041', '046', '050', '045', '044', '036', '035', '043', '037', '039', '038', '042', '047', '106', '110', '108', '105', '117', '133', '093', '097', '099', '114', '190', '195', '197', '191', '231', '233', '230', '232', '249', '251', '252', '253', '355', '356']
	const blanks = ['040', '079', '107', '116', '134', '143', '185', '198', '201', '229', '270', '354']
	for (var i=0; i<blanks.length; i++) {
		os.execCommand(`cp ./public/uniticons/blank.png ./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/resources/_common/wpfg/resources/uniticons/${blanks[i]}_50730.png`, function () {});
	}
	var data = fs.readFileSync(`./modding/requested_mods/${req.body.seed}/data.json`);
	var civ = JSON.parse(data);
	for (var i=0; i<civ.techtree.length; i++) {
		if (i == (civ.techtree.length - 1)) {
			os.execCommand(`cp ./public/uniticons/${iconids[civ.techtree[i][0]]}_50730.png ./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/resources/_common/wpfg/resources/uniticons/${iconids[i]}_50730.png`, function () {
				next();
			});
		} else {
			os.execCommand(`cp ./public/uniticons/${iconids[civ.techtree[i][0]]}_50730.png ./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/resources/_common/wpfg/resources/uniticons/${iconids[i]}_50730.png`, function () {});
		}
	}
}

const writeTechTree = (req, res, next) => {
	modTreeJson.arrangeTechTree(`./modding/requested_mods/${req.body.seed}/data.json`, `./modding/requested_mods/${req.body.seed}/${req.body.seed}-ui/widgetui/civTechTrees.json`);
	next();
}

const writeDatFile = (req, res, next) => {
	os.execCommand(`./modding/build/create-data-mod ./modding/requested_mods/${req.body.seed}/data.json ./public/empires2_x2_p1.dat ./modding/requested_mods/${req.body.seed}/${req.body.seed}-data/resources/_common/dat/empires2_x2_p1.dat`, function () {
		next();
	});
}

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/aoe2techtree/index.html');
});

app.get('/civdrafter', function(req, res) {
	res.sendFile(__dirname + '/public/civdrafter_home.html');
});

app.post('/file', createModFolder, createCivIcons, copyCivIcons, generateJson, writeNames, writeUUIcons, writeTechTree, writeDatFile, (req, res) => {
	res.zip({
		files: [{
			path: __dirname + '/modding/requested_mods/' + (req.body.seed),
			name: (req.body.seed)
		}],
		filename: 'civdraft' + (req.body.seed) + '.zip'
	});
});

app.post('/draft', createDraft, (req, res) => {
	res.render(__dirname + '/public/draft_links', {playerlink: req.playerlink, hostlink: req.hostlink, spectatorlink: req.spectatorlink});
});

app.get('/draft/host/:id', checkCookies, authenticateDraft, function (req, res) {
	if (req.authenticated == -1) {
		res.redirect('/draft/' + req.params.id);
	} else if (req.authenticated == 0) {
		res.render(__dirname + '/public/error', {error: 'Draft does not exist'});
	} else if (req.authenticated == 1) {
		res.sendFile(__dirname + '/public/join.html');
	}
});

app.get('/draft/player/:id', checkCookies, authenticateDraft, function (req, res) {
	if (req.authenticated == -1) {
		res.redirect('/draft/' + req.params.id);
	} else if (req.authenticated == 0) {
		res.render(__dirname + '/public/error', {error: 'Draft does not exist'});
	} else if (req.authenticated == 1) {
		res.sendFile(__dirname + '/public/join.html');
	}
});

app.post('/join', setID, checkCookies, authenticateDraft, checkSpace, (req, res) => {
	if (req.authenticated == -1) {
		res.redirect('/draft/' + req.body.draftID);
	} else if (req.authenticated == 0) {
		res.render(__dirname + '/public/error', {error: 'Draft does not exist'});
	} else if (req.authenticated == 1) {
		res.cookie('playerNumber', req.playerNumber);
		res.cookie('draftID', req.body.draftID);
		res.redirect('/draft/' + req.body.draftID);
	} else if (req.authenticated == 2) {
		res.render(__dirname + '/public/error', {error: 'Host already joined'});
	} else if (req.authenticated == 3) {
		res.render(__dirname + '/public/error', {error: 'Lobby full'});
	}
});

app.get('/draft/:id', checkCookies, authenticateDraft, function (req, res) {
	if (req.authenticated == -1) {
		res.sendFile(__dirname + '/public/draft.html');
	} else if (req.authenticated == 0) {
		res.render(__dirname + '/public/error', {error: 'Draft does not exist'});
	} else if (req.authenticated == 1) {
		res.cookie('playerNumber', -1);
		res.cookie('draftID', req.params.id);
		res.sendFile(__dirname + '/public/draft.html');
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', function(socket) {
	socket.on('join room', (roomID) => {
		socket.join(roomID);
	});
	socket.on('get gamestate', (roomID, playerNumber) => {
		var raw_data = fs.readFileSync('./database.json');
		var data = JSON.parse(raw_data);
		var drafts = data['drafts'];
		var index = -1;
		for (var i=0; i<drafts.length; i++) {
			if (drafts[i]['id'] == roomID) {
				index = i;
			}
		}
		if (playerNumber >= 0) {
			io.in(roomID).emit('set gamestate', drafts[index]);
		} else {
			io.to(socket.id).emit('set gamestate', drafts[index]);
		}
	});
	socket.on('toggle ready', (roomID, playerNumber) => {
		if (playerNumber < 0) {
			console.log('spectator can\'t be ready');
		}
		var raw_data = fs.readFileSync('./database.json');
		var data = JSON.parse(raw_data);
		var drafts = data['drafts'];
		var index = -1;
		for (var i=0; i<drafts.length; i++) {
			if (drafts[i]['id'] == roomID) {
				index = i;
			}
		}
		if (index == -1) {
			console.log('draft doesn\'t exist');
		}
		drafts[index]['players'][playerNumber]['ready'] = (drafts[index]['players'][playerNumber]['ready'] + 1) % 2;
		io.in(roomID).emit('set gamestate', drafts[index]);
	        fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
	});
	socket.on('start draft', (roomID) => {
		var raw_data = fs.readFileSync('./database.json');
		var data = JSON.parse(raw_data);
		var drafts = data['drafts'];
		var index = -1;
		for (var i=0; i<drafts.length; i++) {
			if (drafts[i]['id'] == roomID) {
				index = i;
			}
		}
		if (index == -1) {
			console.log('draft doesn\'t exist');
		}
		drafts[index]['gamestate']['phase'] = 1;
		for (var i=0; i<drafts[index]['preset']['slots']; i++) {
			drafts[index]['players'][i]['ready'] = 0;
		}
		io.in(roomID).emit('set gamestate', drafts[index]);
		fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
	});
	socket.on('update tree', (roomID, playerNumber, tree, civ_name, flag_palette) => {
                var raw_data = fs.readFileSync('./database.json');
                var data = JSON.parse(raw_data);
                var drafts = data['drafts'];
                var index = -1;
                for (var i=0; i<drafts.length; i++) {
                        if (drafts[i]['id'] == roomID) {
                                index = i;
                        }
                }
                if (index == -1) {
                        console.log('draft doesn\'t exist');
                }
		drafts[index]['players'][playerNumber]['tree'] = tree;
		drafts[index]['players'][playerNumber]['ready'] = 1;
		drafts[index]['players'][playerNumber]['alias'] = civ_name;
		drafts[index]['players'][playerNumber]['flag_palette'] = flag_palette
		var nextPhase = 1;
		for (var i=0; i<drafts[index]['preset']['slots']; i++) {
			if (drafts[index]['players'][i]['ready'] != 1) {
				nextPhase = 0;
			}
		}
		if (nextPhase == 1) {
			drafts[index]['gamestate']['phase'] = 2;
			for (var i=0; i<drafts[index]['preset']['slots']; i++) {
				drafts[index]['players'][i]['ready'] = 0;
			}
			io.in(roomID).emit('set gamestate', drafts[index]);
		}
		fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
	});
});
