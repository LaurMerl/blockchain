const SHA256 = require('crypto-js/sha256')
const utils = require('./utils');

class Block {
    constructor(index, timestamp, data, previousHash) {
        // location of block
        this.index = index;
        // when the block was created
        this.timestamp = timestamp;
        this.data = data;
        // maintains the integrity of the chain
        this.previousHash = previousHash;
        // mining mechanism
        this.difficulty = 0;
        // block’s own hash (derived from calculateHash)
        this.hash = this.calculateHash();
    }

    generateNextBlock(blockData, blockchain) {
        const previousBlock = blockchain.latestBlock();
        const chain = blockchain.getBlockchain();
        const difficulty = blockchain.getDifficulty(chain);
        const nextIndex= previousBlock.index + 1;
        const nextTimestamp = utils.getCurrentTimestamp();
        const newBlock = this.mineBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData.data, difficulty);

        if (Block.isValidNewBlock(newBlock, previousBlock))
            blockchain.addBlock(newBlock);
        return newBlock;
    };

    calculateHash() {
        // takes in every piece of the block object, throws it into a SHA256 function, and converts it into a string
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.difficulty).toString();
    }

    mineBlock(index, previousHash, timestamp, data, difficulty) {
        let nonce = 0;
        while (true) {
            const hash = this.calculateHash();
            if (this.hashMatchesDifficulty(hash, difficulty)) {
                return new Block(index, timestamp, data, previousHash, difficulty, hash);
            }
            nonce++;
        }
    }

    hashMatchesDifficulty(hash, difficulty) {
        const hashInBinary = utils.hexToBinary(hash);
        const requiredPrefix = '0'.repeat(difficulty);
        return hashInBinary.startsWith(requiredPrefix);
    };

    static isValidNewBlock(newBlock, previousBlock) {
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log('Invalid index');
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash) {
            console.log('Invalid previoushash');
            return false;
        } else if (!this.isValidTimestamp(newBlock, previousBlock)) {
            console.log('Invalid timestamp');
            return false;
        }
        return true;
    };

    static isValidTimestamp(newBlock, previousBlock) {
        return ( previousBlock.timestamp - 60 < newBlock.timestamp )
            && newBlock.timestamp - 60 < utils.getCurrentTimestamp();
    };
}

module.exports = Block;