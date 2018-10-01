const Block = require('./block');
const utils = require('./utils');

class Blockchain {
  /** @constructor */
  constructor() {
    this.chain = [Block.createGenesis()];
  }

  /**
   * Get the information about the most recent block.
   * @returns {Block} 
   */
  latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Get the chain.
   * @returns {Blockchain} 
   */
  getBlockchain() {
    return this.chain;
  }

  /**
   * Given a newBlock, uses latestBlock() to give its index, previousHash and hash
   * @param {Block} - block object
   */
  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.hash = Block.calculateHash();
    this.chain.push(newBlock);
  }

  /**
   * Checks the the integrity of the blockchain
   * @returns {Boolean} - true if block is valid
   */
  checkValid() {
    for (let i = 1; i < this.chain.length; i += 1) {
      if (!Block.isValidNewBlock(this.chain[i], this.chain[i - 1])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Retrieve the difficulty of the chain
   * @param {Blockchain} - current blockchain
   * @returns {Number} - chain's difficulty
   */
  getDifficulty(aBlockchain) {
    const latestBlock = this.latestBlock();
    if (
      latestBlock.index % utils.DIFFICULTY_ADJUSTMENT_INTERVAL === 0 &&
      latestBlock.index !== 0
    ) {
      return Blockchain.getAdjustedDifficulty(aBlockchain);
    }
    return latestBlock.difficulty;
  }

  /**
   * The difficulty must be adjusted in order to match the chain difficulty
   * For every DIFFICULTY_ADJUSTMENT_INTERVAL blocks that is generated, 
   * we check if the time that took to generate those blocks are larger or smaller than the expected BLOCK_GENERATION_INTERVAL time
   * @param {Blockchain} - current blockchain
   * @returns {Number} - adjusted block difficulty
   */
  static getAdjustedDifficulty(aBlockchain) {
    const latestBlock = aBlockchain[aBlockchain.length -1];
    const prevAdjustmentBlock =
      aBlockchain[aBlockchain.length - utils.DIFFICULTY_ADJUSTMENT_INTERVAL];
    const timeExpected =
      utils.BLOCK_GENERATION_INTERVAL * utils.DIFFICULTY_ADJUSTMENT_INTERVAL;
    const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
    if (timeTaken < timeExpected / 2) {
      return prevAdjustmentBlock.difficulty + 1;
    } else if (timeTaken > timeExpected * 2) {
      return prevAdjustmentBlock.difficulty - 1;
    }
  }
}

module.exports = Blockchain;
