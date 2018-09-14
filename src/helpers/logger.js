import { LOGGER_SCORE } from '../constants';

/**
 * getScoreMessage function to get a template message as per score
 * as per matrix unit
 * @param {number} score - current score
 * @returns {string} templated message
 */
export const getScoreMessage = score => `${LOGGER_SCORE}: ${score}`;
