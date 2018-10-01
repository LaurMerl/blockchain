var chai = require("chai");
const { expect } = require('chai');
chai.should();
chai.use(require('chai-things'));

const SHA256 = require('crypto-js/sha256');
const Blockchain = require('../blockchain');
const Block = require('../block');

const blockchain = new Blockchain();

/* eslint-env mocha */
describe('Mine new block', () => {
  const newBlock = Block.generateNextBlock('Some test data', blockchain);
  const chain = blockchain.getBlockchain();

  it('It should be mined', (done) => {
    expect(chain).to.be.a('array')
    expect(chain.length).to.be.gte(2);
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
    expect(newBlock.previousHash)
      .to.be.a('string')
      .of.length(64);

    expect(newBlock).to.have.property('hash');
    expect(newBlock.hash)
      .to.be.a('string')
      .of.length(64);

    expect(newBlock).to.have.property('difficulty');
    expect(newBlock.difficulty).to.be.a('number');

    done();
  });

  it('It should fail invalid index', (done) => {
    const genesisBlock = chain[0];
    const faultBlock = {
      index: 3,
      timestamp: 1529844281,
      data: 'Some test data',
      previousHash:
        'c6f835d626e32274037e31de606a140e8431ce0a9d416657e79cf85c16c5ca2f',
      difficulty: 0,
      hash: 'd2b8716411d3c0a0725fe748e8d42a8fd8bf72802bd1d4cfa81e4d796b5d6822'
    };
    expect(genesisBlock).to.be.a('object');
    try {
      Block.isValidNewBlock(faultBlock, genesisBlock);
    } catch (err) {
      expect(err.message).to.equal('Invalid index');
    }
    done();
  });

  it('It should fail previous hash', (done) => {
    const genesisBlock = chain[0];
    const faultBlock = {
      index: 1,
      timestamp: 1529844281,
      data: 'Some test data',
      previousHash: 'asuperfakehash',
      difficulty: 0,
      hash: 'dnsandicaisdubvajbsc'
    };
    expect(genesisBlock).to.be.a('object');
    try {
      Block.isValidNewBlock(faultBlock, genesisBlock);
    } catch (err) {
      expect(err.message).to.equal('Invalid previoushash');
    }
    done();
  });

  it('It should fail previous timestamp', (done) => {
    const genesisBlock = chain[0];
    const faultBlock = {
      index: 1,
      timestamp: 12,
      data: 'Some test data',
      previousHash: `${chain[0].hash}`,
      difficulty: 0,
      hash: 'd2b8716411d3c0a0725fe748e8d42a8fd8bf72802bd1d4cfa81e4d796b5d6822'
    };
    expect(genesisBlock).to.be.a('object');
    try {
      Block.isValidNewBlock(faultBlock, genesisBlock);
    } catch (err) {
      expect(err.message).to.equal('Invalid timestamp');
    }
    done();
  });
});

describe('Check genesis block integrity', () => {
  const chain = blockchain.getBlockchain();
  const genesisBlock = chain[0];

  it('It should be mined', (done) => {
    expect(genesisBlock).to.be.a('object');
    done();
  });

  it('It should have right values', (done) => {
    expect(genesisBlock.index).to.be.eql(0);
    expect(genesisBlock.previousHash).to.be.eql(SHA256('0').toString());
    expect(genesisBlock.hash).to.be.eql(
      SHA256(
        genesisBlock.index +
          genesisBlock.timestamp +
          genesisBlock.data +
          genesisBlock.previousHash +
          genesisBlock.difficulty +
          genesisBlock.nonce
      ).toString()
    );
    done();
  });
});

describe('Get chain and test integrity', () => {
  const chain = blockchain.getBlockchain();
  const valid = blockchain.checkValid();
  const genesisBlock = chain[0];
  const firstBlock = chain[1];

  it('Should be 2 blocks long', (done) => {
    expect(chain).to.be.a('array')
    expect(chain.length).to.be.gte(2);
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

describe('Increase difficulty over 5 blocks', () => {
  for (i = 0; i <= 3; i++ ) {
    Block.generateNextBlock(`Some data for block ${i}`, blockchain);
  }
  const chain = blockchain.getBlockchain();

  it('Should be 5 blocks long (genesis excluded)', (done) => {
    expect(chain.length).to.be.eql(6);
    chain.should.all.have.property('difficulty');
    chain.should.contain.an.item.with.property( 'difficulty', 1)
    done();
  });
});
