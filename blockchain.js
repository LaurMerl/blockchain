const Block = require( './block');
const utils = require('./utils');
const SHA256 = require('crypto-js/sha256')

class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
    }

    // creates the very first block of our chain
    createGenesis() {
        return new Block(0, utils.getCurrentTimestamp(), utils.getCurrentDate, SHA256('0').toString(), 0);
    }

    // get the information about the most recent block
    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    getBlockchain() {
        return this.chain;
    }

    // given a newBlock, uses latestBlock() to give its index, previousHash and hash
    addBlock(newBlock){
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // checks the the integrity of the blockchain
    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            if (!Block.isValidNewBlock(this.chain[i], this.chain[i - 1])) {
                return false;
            }
        }
        return true;
    };

    // retrieve the difficulty of the chain
    getDifficulty(aBlockchain) {
        const latestBlock = this.latestBlock();
        if (latestBlock.index % utils.DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
            return this.getAdjustedDifficulty(latestBlock, aBlockchain);
        } else {
            return latestBlock.difficulty;
        }
    };

    // the difficulty must be adjusted in order to match the chain difficulty
    getAdjustedDifficulty(latestBlock, aBlockchain) {
        const prevAdjustmentBlock = aBlockchain[aBlockchain.length - utils.DIFFICULTY_ADJUSTMENT_INTERVAL];
        const timeExpected = utils.BLOCK_GENERATION_INTERVAL * utils.DIFFICULTY_ADJUSTMENT_INTERVAL;
        const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
        if (timeTaken < timeExpected / 2) {
            return prevAdjustmentBlock.difficulty + 1;
        } else if (timeTaken > timeExpected * 2) {
            return prevAdjustmentBlock.difficulty - 1;
        } else {
            return prevAdjustmentBlock.difficulty;
        }
    };

}

module.exports = Blockchain;