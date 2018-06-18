const bodyParser = require('body-parser');
const express = require('express');

const blockchain = require( './blockchain');
const block = require( './block');

const Blockchain = new blockchain();
const Block = new block();

const httpPort = parseInt(process.env.HTTP_PORT) || 3001;

const initHttpServer = (myHttpPort) => {
    const app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => {
        res.send(Blockchain.getBlockchain());
    });

    app.post('/mineBlock', (req, res) => {
        const newBlock = Block.generateNextBlock(req.body.data, Blockchain);
        res.send(newBlock);
    });

    app.get('/chainValid', (req, res) => {
        res.send(Blockchain.checkValid());
    });

    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};

initHttpServer(httpPort);