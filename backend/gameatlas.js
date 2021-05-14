const http = require('http');
const express = require('express');
const fs = require('fs');
const app = require('express')();
const path = require('path');
const cors = require('cors');

const hostname = 'localhost';
const port = 3000;

const server = require('http').Server(app);


app.get("/GameAtlas/", (req, res) => {
  res.sendfile('/public/index.html', {'root': '/var/www/krakenmeister.com/GameAtlas'});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
