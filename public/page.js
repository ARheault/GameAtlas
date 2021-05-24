function removeAllChildNodes (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

let home = document.getElementById('home')
let about = document.getElementById('about')
let chat = document.getElementById('chat')

chat.addEventListener('click', chatConnect)

home.onclick = function () {
    let container = document.getElementById('container')
    removeAllChildNodes(container)

    let title = document.createElement('div')
    title.className = 'title'
    title.innerHTML = 'Game Atlas'

    let search = document.createElement('div')
    search.className = 'action'
    search.id = 'search'
    search.innerHTML = 'Search'

    let addgame = document.createElement('div')
    addgame.className = 'action'
    addgame.id = 'addgame'
    addgame.innerHTML = 'Add Game'

    let chat = document.createElement('div')
    chat.className = 'action'
    chat.id = 'chat'
    chat.innerHTML = 'Chat'
    chat.addEventListener('click', chatConnect)

    container.appendChild(title)
    container.appendChild(search)
    container.appendChild(addgame)
    container.appendChild(chat)
}

about.onclick = function () {
    let container = document.getElementById('container')
    removeAllChildNodes(container)

    let abouttitle = document.createElement('div')
    abouttitle.className = 'about'
    abouttitle.id = 'abouttitle'
    abouttitle.innerHTML = 'About:'

    let abouttext = document.createElement('div')
    abouttext.className = 'about'
    abouttext.id = 'abouttext'
    abouttext.innerHTML = 'Project by Alexander Rheaualt, Keith McGinnis, and John Meo. Full stack web application for the corresponding course at Portland State University. Incorporates Google Map Static API, Mongoose API, and SocketIO. Open-source project available on GitHub <a href="https://github.com/ARheault/GameAtlas">here</a>.'

    container.appendChild(abouttitle)
    container.appendChild(abouttext)
}

function chatConnect () {
    let container = document.getElementById('container')
    removeAllChildNodes(container)

    var socket = io()
}