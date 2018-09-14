import _isEqualWith from 'lodash/isEqualWith';
import { INTERVAL } from './constants';
import { boardConfig, foodConfig, snakeConfig } from './config';
import {
  Board, Snake, Food, Logger,
} from './modules';

let GAME;
const domWrapper = document.getElementById('wrapper');
const loggerElem = document.getElementById('logger');
const restartButton = document.getElementById('restartButton');
domWrapper.focus();

// initialization
const initGame = (parentElem) => {
  Logger.init(loggerElem);
  Board.init(boardConfig, parentElem);
  Snake.init(snakeConfig);
  Food.init(foodConfig);

  // attach key events
  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    Snake.setDirection(evt.keyCode);
  });

  restartButton.addEventListener('click', () => {
    window.location.reload();
  });

  // create snake and food
  Snake.create();
  Food.create();
};

// end game
const killGame = () => {
  Snake.destroy();
  clearInterval(GAME);
  Logger.log({ ended: true });
  restartButton.style.display = 'inline-block';
};

// keep running the game in a loop
const loopGame = () => {
  const isValidBoardMove = Snake.isValidBoardMove();
  if (!isValidBoardMove) {
    killGame();
    return;
  }

  const isSuicidal = Snake.isSuicidalMove();

  if (isSuicidal) {
    killGame();
    return;
  }

  const foodPosition = Food.getPosition();
  const currentSnakeHead = Snake.getHeadPosition();
  const isCaptureMove = _isEqualWith(currentSnakeHead, foodPosition);

  Snake.move({ isCaptureMove });

  if (isCaptureMove) {
    Logger.log({ score: Snake.getScore() });
    Food.create();
  }
};

// kick-off
initGame(domWrapper);
GAME = setInterval(loopGame, INTERVAL);
