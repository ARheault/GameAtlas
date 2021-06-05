# GameAtlas
GameAtlas is a web based app written in JS using modern frameworks that allows for users to interact and find fun bar games.

The file structure separates the front end into [public](https://github.com/ARheault/GameAtlas/tree/development/public) and the backend into [backend](https://github.com/ARheault/GameAtlas/tree/development/backend).

The frontend file strucuture holds the html pages in the [pages](https://github.com/ARheault/GameAtlas/tree/development/public/pages) subdirectory, while holding the stylesheets in the [styles](https://github.com/ARheault/GameAtlas/tree/development/public/styles) subdirectory, and finally holding all scripts in the [scripts](https://github.com/ARheault/GameAtlas/tree/development/public/scripts) subdirectory. In each of these subdirectories there are further divisions to make it easy to find what script or page is connected to each facet of the application.

The backend structure is similar in that it takes a modular approach and is split into subdirectories that contain the [data models](https://github.com/ARheault/GameAtlas/tree/development/backend/models), the [routes](https://github.com/ARheault/GameAtlas/tree/development/backend/routes) that control the actiaons that can be taken on those models and abstract them from the front end, and finally the [server file](https://github.com/ARheault/GameAtlas/blob/development/backend/GameAtlas.js) where these are linked and connected to the front end.


This explanation will use Visual Studio Code for examples, to use a different IDE or development enviornment these steps will need to be adapted to your situation.
To the run this application locally you must first clone onto your local machine using the following list of commands at the command line:

First open Visual Studio Code and open a terminal.
![image](https://user-images.githubusercontent.com/71666828/120891143-bc154980-c5bb-11eb-8274-4c119b2934b4.png)

Next move into a directory that you want to work in using cd (change directory): cd "directory you want to work in"

![image](https://user-images.githubusercontent.com/71666828/120891177-fbdc3100-c5bb-11eb-9fac-0bc14b653a1a.png)


Now use the command mkdir to make a directory for you to work in, for this I used the exact command: "mkdir example"

![image](https://user-images.githubusercontent.com/71666828/120891212-2e862980-c5bc-11eb-824b-8decfc977ef2.png)

![image](https://user-images.githubusercontent.com/71666828/120891216-33e37400-c5bc-11eb-9f75-c1bf691c9dcc.png)

Now initialize the git repository using the command "git init"

![image](https://user-images.githubusercontent.com/71666828/120891230-507fac00-c5bc-11eb-9549-e578e6d85f92.png)

Now head to the github page for this project and navigate to the stable branch of your choosing and click where the mouse is hovering in the following screenshot:

![image](https://user-images.githubusercontent.com/71666828/120891307-b3714300-c5bc-11eb-80f3-d069cadb14ec.png)

Now back to your Visual Studio Code window where you will enter the following command "git clone https://github.com/ARheault/GameAtlas.git".
Note, you can either copy paste it from here or type git clone and press control v to paste the value we copied in the previous step.

![image](https://user-images.githubusercontent.com/71666828/120891394-4dd18680-c5bd-11eb-89ee-982156d170e6.png)

Now you've cloned the project! Only two more steps!

Now enter the following commands, this is where you must make sure that you have reached out to me so I can give you the keys otherwise you cannot move forward,

"cd GameAtalas/backend"

Followed by "npm install"

Now not using the terminal, but through the file explorer open the project like this

![image](https://user-images.githubusercontent.com/71666828/120891583-38109100-c5be-11eb-958e-c9faf83eedcc.png)


Now click and this should pop up

![image](https://user-images.githubusercontent.com/71666828/120891586-4068cc00-c5be-11eb-80ac-89b7e7dc9003.png)

Click on open folder and navigate to the folder that we build, mine is called example and open that file.
If you've done this correctly your screen should look like this:

![image](https://user-images.githubusercontent.com/71666828/120891613-5f675e00-c5be-11eb-8250-72412a46e5c4.png)

Click on public and then click on the add file button

