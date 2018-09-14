import { LOGGER_GAME_OVER } from '../constants';
import { getScoreMessage } from '../helpers/logger';

/**
 * Weakmap for maintaining internal state.
 */
const privates = new WeakMap();

/**
 * init function to initialize the state for Logger
 * @param {domNode} logger - dom node to update score
 */
function init(logger) {
  privates.set(this, { logger });
}

/**
 * log function to log score
 * @param {object} options - options for logging
 * @param {number} options.score - score passed
 * @param {boolean} options.ended - game ended or not
 */
function log({ score, ended }) {
  const { logger } = privates.get(this);
  if (ended) {
    const prevMsg = logger.textContent;
    logger.textContent = `${LOGGER_GAME_OVER} -- ${prevMsg}`;
  } else {
    logger.textContent = getScoreMessage(score);
  }
}

const Logger = Object.freeze({
  init,
  log,
});

export default Logger;
