class Block {
    constructor(timestamp, data) {
        // location of block
        this.index = 0;
        // when the block was created
        this.timestamp = timestamp;
        this.data = data;
        // maintains the integrity of the chain
        this.previousHash = "0";
        // block’s own hash (derived from calculateHash)
        this.hash = this.calculateHash();
        // mining mechanism
        this.nonce = 0;
    }

    calculateHash() {
        // takes in every piece of the block object, throws it into a SHA256 function, and converts it into a string
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    mineBlock(difficulty) {

    }
}