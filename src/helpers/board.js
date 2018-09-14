import { BOARD_EMPTY_MARKER } from '../constants';

/**
 * createBoard function to create a canvas element and return it
 * as per the range passed
 * @param {number} width - width in pixels
 * @param {number} height - height in pixels
 * @param {number} color - background color
 * @returns {dom element} board - the canvas element created
 */
export const createBoard = (width, height, color) => {
  const board = document.createElement('canvas');
  board.setAttribute('width', width);
  board.setAttribute('height', height);
  board.setAttribute('style', `background:${color}`);
  return board;
};

/**
 * initMatrix function to initialize the board matrix
 * as per initial empty marker
 * @param {number} rows - number of rows
 * @param {number} cols - number of cols
 * @returns {array} matrix - [][] which represents the board
 */
export const initMatrix = (rows, cols) => {
  const matrix = [];
  for (let i = 0; i < rows; i += 1) {
    const row = [];
    for (let j = 0; j < cols; j += 1) {
      row.push(BOARD_EMPTY_MARKER);
    }
    matrix.push(row);
  }
  return matrix;
};

/**
 * getBoardPosition function to get x, y coords of the board
 * as per matrix unit
 * @param {number} x- x coordinate in pixels
 * @param {number} y - y coordinate in pixels
 * @param {number} unit - unit in pixels
 * @returns {object} x, y coords as per board matrix
 */
export const getBoardPosition = (x, y, unit) => ({
  boardX: Math.floor(x / unit),
  boardY: Math.floor(y / unit),
});


/**
 * getCanvasPixelPosition function to get x, y coords in actual pixels
 * @param {number} x- x coordinate in matrix
 * @param {number} y - y coordinate in matrix
 * @param {number} unit - unit in pixels
 * @returns {object} x, y coords as per pixels
 */
export const getCanvasPixelPosition = (x, y, unit) => ({
  canvasX: x * unit,
  canvasY: y * unit,
});

/**
 * getRandomNumberBetweenRange function to get a random position
 * as per the range passed
 * @param {number} min - minimum value
 * @param {number} max - maximum value
 * @returns {number} random number
 */
export const getRandomNumberBetweenRange = (min, max) => Math.floor(Math.random() * max) + min;

/**
 * getRandomCoordinates function to get random coords as per matrix
 * @param {object} options - object containing below keys
 * @param {number} options.xMin - minimum x coord
 * @param {number} options.xMax - maximum x coord
 * @param {number} options.yMin - minimum y coord
 * @param {number} options.yMax - maximum y coord
 * @returns {object} x, y coords
 */
export const getRandomCoordinates = ({
  xMin, xMax, yMin, yMax,
}) => ({
  x: getRandomNumberBetweenRange(xMin, xMax),
  y: getRandomNumberBetweenRange(yMin, yMax),
});