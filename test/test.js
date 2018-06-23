const expect = require('chai').expect;
const SHA256 = require('crypto-js/sha256')

const blockchain = require( '../blockchain');
const Blockchain = new blockchain();
const block = require( '../block');
const Block = new block();


describe('Mine new block', () => {
    const newBlock = Block.generateNextBlock({ data: 'Some test data' }, Blockchain);
    const chain = Blockchain.getBlockchain();

    it('It should be mined', (done) => {
        expect(chain).to.be.a('array').with.lengthOf(2);
        done();
    });

    it('It should have the right structure', (done) => {
        expect(newBlock).to.be.a('object');
        expect(newBlock).to.have.property('index');
        expect(newBlock.index).to.be.a('number');

        expect(newBlock).to.have.property('timestamp');
        expect(newBlock.timestamp).to.be.a('number');

        expect(newBlock).to.have.property('data');
        expect(newBlock.data).to.be.a('string');

        expect(newBlock).to.have.property('previousHash');
        expect(newBlock.previousHash).to.be.a('string').of.length(64);

        expect(newBlock).to.have.property('hash');
        expect(newBlock.hash).to.be.a('string').of.length(64);

        expect(newBlock).to.have.property('difficulty');
        expect(newBlock.difficulty).to.be.a('number');

        done();
    });
});

describe('Check genesis block integrity', () => {
    const chain = Blockchain.getBlockchain();
    const genesisBlock = chain[0];

    it('It should be mined', (done) => {
        expect(genesisBlock).to.be.a('object');
        done();
    });

    it('It should have right values', (done) => {
        expect(genesisBlock.index).to.be.eql(0);
        expect(genesisBlock.previousHash).to.be.eql(SHA256('0').toString());
        expect(genesisBlock.hash).to.be.eql(
            SHA256(genesisBlock.index + genesisBlock.previousHash + genesisBlock.timestamp + genesisBlock.data + genesisBlock.difficulty).toString());
        done();
    });
});

describe('Get chain and test integrity', () => {
    const chain = Blockchain.getBlockchain();
    const valid = Blockchain.checkValid();
    const genesisBlock = chain[0];
    const firstBlock = chain[1];

    it('Should be 2 blocks long', (done) => {
        expect(chain).to.be.a('array').with.lengthOf(2);
        done();
    });

    it('It should be continuous', (done) => {
        expect(firstBlock.previousHash).to.be.eql(genesisBlock.hash);
        done();
    });

    it('It should be valid', (done) => {
        expect(valid).to.be.eql(true);
        done();
    });
});