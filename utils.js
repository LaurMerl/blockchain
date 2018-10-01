/**
 * Consensus on the difficulty in seconds.
 * @returns {Number}
 */const BLOCK_GENERATION_INTERVAL = 10;

/**
 * Consensus on the difficulty in blocks.
 * @returns {Number}
 */
const DIFFICULTY_ADJUSTMENT_INTERVAL = 4;

const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);

const lookupTable = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  a: '1010',
  b: '1011',
  c: '1100',
  d: '1101',
  e: '1110',
  f: '1111'
};

/**
 * Conversion function from  Hex to Binary.
 * @param {String} - Hex string to be converted
 * @returns {String} - Binary value as string
 */
const hexToBinary = (s) => {
  let ret = '';
  for (let i = 0; i < s.length; i += 1) {
    if (lookupTable[s[i]]) {
      ret += lookupTable[s[i]];
    } else {
      return null;
    }
  }
  return ret;
};

module.exports = {
  BLOCK_GENERATION_INTERVAL,
  DIFFICULTY_ADJUSTMENT_INTERVAL,
  getCurrentTimestamp,
  hexToBinary
};
