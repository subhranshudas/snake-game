# How to install
```
npm install
```

## How to start the APPs
```
npm start
```
Then open [localhost:8080](http://localhost:8080/).

## How to Play
Use the LEFT, UP, RIGHT, DOWN arrow keys to control the direction of the snake


## Rules
1. Game will not stop till the snake is killed.
2. Snake will be killed if it hits any side of the walls.
3. Each time food is captured the snake grows and the score increases.


## Codebase
The APP starts in `main.js` by importing dependencies and initializing them.
Later we loop the game and kill it if the rules are not followed.

All the modules basically export public-consuming APIs.

1) Board - this basically deals with drawing repsonsibility for the APP. Any thing that needs to be drawn will be delegated to this module.
2) Snake - deals with the state management of the Snake at any given time.
3) Food - deals with the state management of the food, responsible creating food
4) helpers - these functions abstract out certain logic which does not involve any module dependency.
5) utils - any code that may be used across.
6) config - this takes care of providing for the initializing the modules, may come from any JSON later
7) constants - app wide constants
8) Logger - used to display score

* Unless any context binding is needed, functions are written as arrows


## Backlog
1. Generate dynamically a snake body each time a game starts (now its a constant).
2. Increase the pace when the score increases.
3. can we avoid setInterval? any other mechanism to loop the game.


