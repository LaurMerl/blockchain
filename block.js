const SHA256 = require('crypto-js/sha256');
const utils = require('./utils');

class Block {
  constructor(index, timestamp, data, previousHash, difficulty, nonce) {
    // location of block
    this.index = index;
    // when the block was created
    this.timestamp = timestamp;
    this.data = data;
    // maintains the integrity of the chain
    this.previousHash = previousHash;
    this.nonce = this.nonce;
    // mining mechanism
    this.difficulty = difficulty;
    // block’s own hash (derived from calculateHash)
    this.hash = Block.calculateHash(
      this.index,
      this.timestamp,
      this.data,
      this.previousHash,
      this.difficulty,
      this.nonce
    );
  }

  // creates the very first block of our chain
  static createGenesis() {
    return new Block(
      0,
      utils.getCurrentTimestamp(),
      utils.getCurrentDate,
      SHA256('0').toString(),
      0,
      0
    );
  }

  static generateNextBlock(blockData, blockchain) {
    const previousBlock = blockchain.latestBlock();
    const chain = blockchain.getBlockchain();
    const difficulty = blockchain.getDifficulty(chain);
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = utils.getCurrentTimestamp();
    const newBlock = Block.mineBlock(
      nextIndex,
      previousBlock.hash,
      nextTimestamp,
      blockData,
      difficulty
    );

    if (Block.isValidNewBlock(newBlock, previousBlock)) {
      blockchain.addBlock(newBlock);
    }
    return newBlock;
  }

  // calculateHash() {
  //   // takes in every piece of the block object, throws it into a SHA256 function,
  //   // and converts it into a string
  //   return SHA256(
  //     this.index +
  //       this.previousHash +
  //       this.timestamp +
  //       this.data +
  //       this.difficulty
  //   ).toString();
  // }

  static calculateHash(
    // takes in every piece of the block object, throws it into a SHA256 function,
    // and converts it into a string
    index,
    previousHash,
    timestamp,
    data,
    difficulty,
    nonce
  ) {
    return SHA256(
      index + previousHash + timestamp + data + difficulty + nonce
    ).toString();
  }

  static mineBlock(index, previousHash, timestamp, data, difficulty) {
    let nonce = 0;
    while (true) {
      const hash = Block.calculateHash(
        index,
        previousHash,
        timestamp,
        data,
        difficulty,
        nonce
      );
      if (Block.hashMatchesDifficulty(hash, difficulty)) {
        return new Block(index, timestamp, data, previousHash, difficulty);
      }
      nonce += 1;
    }
  }

  static hashMatchesDifficulty(hash, difficulty) {
    const hashInBinary = utils.hexToBinary(hash);
    const requiredPrefix = '0'.repeat(difficulty);
    return hashInBinary.startsWith(requiredPrefix);
  }

  static isValidNewBlock(newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
      throw new Error('Invalid index');
    } else if (previousBlock.hash !== newBlock.previousHash) {
      throw new Error('Invalid previoushash');
    } else if (!Block.isValidTimestamp(newBlock, previousBlock)) {
      throw new Error('Invalid timestamp');
    }
    return true;
  }

  static isValidTimestamp(newBlock, previousBlock) {
    return (
      previousBlock.timestamp - 60 < newBlock.timestamp &&
      newBlock.timestamp - 60 < utils.getCurrentTimestamp()
    );
  }
}

module.exports = Block;
