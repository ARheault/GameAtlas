# GameAtlas
GameAtlas is a web based app written in JS using modern frameworks that allows for users to interact and find fun bar games.

The file structure separates the front end into [public](https://github.com/ARheault/GameAtlas/tree/development/public) and the backend into [backend](https://github.com/ARheault/GameAtlas/tree/development/backend).

The frontend file strucuture holds the html pages in the [pages](https://github.com/ARheault/GameAtlas/tree/development/public/pages) subdirectory, while holding the stylesheets in the [styles](https://github.com/ARheault/GameAtlas/tree/development/public/styles) subdirectory, and finally holding all scripts in the [scripts](https://github.com/ARheault/GameAtlas/tree/development/public/scripts) subdirectory. In each of these subdirectories there are further divisions to make it easy to find what script or page is connected to each facet of the application.

The backend structure is similar in that it takes a modular approach and is split into subdirectories that contain the [data models](https://github.com/ARheault/GameAtlas/tree/development/backend/models), the [routes](https://github.com/ARheault/GameAtlas/tree/development/backend/routes) that control the actiaons that can be taken on those models and abstract them from the front end, and finally the [server file](https://github.com/ARheault/GameAtlas/blob/development/backend/GameAtlas.js) where these are linked and connected to the front end.


