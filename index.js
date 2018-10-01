const json = require('body-parser');
const express = require('express');
const Blockchain = require('./blockchain');
const Block = require('./block');

const blockchain = new Blockchain();

const httpPort = parseInt(process.env.HTTP_PORT, 10) || 3001;

const initHttpServer = (myHttpPort) => {
  const app = express();
  app.use(json());

  app.get('/blocks', (req, res) => {
    res.send(JSON.stringify(blockchain.getBlockchain(), null, 4));
  });

  app.post('/mineBlock', (req, res) => {
    const newBlock = Block.generateNextBlock(req.body.data, blockchain);
    res.send(newBlock);
  });

  app.get('/chainValid', (req, res) => {
    res.send(blockchain.checkValid());
  });

  app.listen(myHttpPort, () => {
    console.log(`Listening http on port: ${myHttpPort}`);
  });
};

initHttpServer(httpPort);
