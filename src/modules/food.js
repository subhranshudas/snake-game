import { FOOD_COLOR, FOOD_MARKER } from '../constants';
import Board from './board';

/**
 * Weakmap for maintaining internal state.
 */
const privates = new WeakMap();

/**
 * init function to initialize the state for Food
 * @param {object} options - config for food to be passed
 * @param {string} options.color - color of the food
 */
function init(options) {
  const { color = FOOD_COLOR } = options;
  privates.set(this, {
    color,
    position: { x: null, y: null },
  });
}

/**
 * create function to create a food
 */
function create() {
  const { color, position } = privates.get(this);
  const { x, y } = Board.getRandomEmptyPosition();

  // set the position
  position.x = x;
  position.y = y;
  Board.drawUnit(position.x, position.y, color, FOOD_MARKER);
}

/**
 * create function to create a food
 * @returns { object } return an object containing x, y coordinates
 */
function getPosition() {
  const { position } = privates.get(this);
  return { x: position.x, y: position.y };
}


// Public API for Food
const Food = Object.freeze({
  init,
  create,
  getPosition,
});

export default Food;
