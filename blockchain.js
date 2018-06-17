const Block = require("./block");
const utils = require("./utils");

class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
    }

    // creates the very first block of our chain
    createGenesis() {
        return new Block(0, utils.getCurrentTimestamp, this.getCurrentDate, "0");
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
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            // matching currentBlock.hash with currentBlock.calculateHash()
            // checks if currentBlock’s info has been tampered with without updating currentBlock.hash
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            // matching currentBlock.previousHash with previousBlock.hash
            // checks whether or not a previousBlock has been tampered
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getDifficulty(aBlockchain) {
        const latestBlock = this.latestBlock();
        if (latestBlock.index % utils.DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
            return this.getAdjustedDifficulty(latestBlock, aBlockchain);
        } else {
            return latestBlock.difficulty;
        }
    };

    getAdjustedDifficulty(latestBlock, aBlockchain) {
        const prevAdjustmentBlock = aBlockchain[blockchain.length - utils.DIFFICULTY_ADJUSTMENT_INTERVAL];
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