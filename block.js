const SHA256 = require('crypto-js/sha256')
const utils = require("./utils");

class Block {
    constructor(index, timestamp, data, previousHash) {
        // location of block
        this.index = index;
        // when the block was created
        this.timestamp = timestamp;
        this.data = data;
        // maintains the integrity of the chain
        this.previousHash = previousHash;
        // block’s own hash (derived from calculateHash)
        this.hash = this.calculateHash();
        // mining mechanism
        this.nonce = 0;
    }

    generateNextBlock(blockData, Blockchain) {
        const previousBlock = Blockchain.latestBlock;
        const difficulty = Blockchain.getDifficulty(Blockchain.getBlockchain);
        console.log('difficulty: ' + difficulty);
        debugger;
        const nextIndex= previousBlock.index + 1;
        const nextTimestamp = utils.getCurrentTimestamp();
        const newBlock = this.mineBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);

        Blockchain.addBlock(newBlock);
        return newBlock;
    };

    calculateHash() {
        // takes in every piece of the block object, throws it into a SHA256 function, and converts it into a string
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    mineBlock(index, previousHash, timestamp, data, difficulty) {
        let nonce = 0;
        while (true) {
            const hash = this.calculateHash();
            if (this.hashMatchesDifficulty(hash, difficulty)) {
                return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce);
            }
            nonce++;
        }
    }

    hashMatchesDifficulty(hash, difficulty) {
        const hashInBinary = utils.hexToBinary(hash);
        const requiredPrefix = '0'.repeat(difficulty);
        return hashInBinary.startsWith(requiredPrefix);
    };
}

module.exports = Block;