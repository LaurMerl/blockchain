// Make sure a NODE_ENV is provided
const mode = process.env.NODE_ENV;
if (!mode) throw new Error('Make sure to set NODE_ENV');

const packageJson = require('./package.json');

const VERSION = packageJson.version;
const ENVIRONMENT = process.env.NODE_ENV;

/**
 * ========================================================
 * ===================== EXPRESS ==========================
 * ========================================================
 */

// Load the express module to setup the webserver
// and serve the html
const express = require('express');

// Server port read from environment variable
const app = express();
const http = require('http');

app.set('port', (process.env.PORT || 5000));

const server = http.createServer(app);

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(app.get('port'), () => {
    console.log('Webapp is running on port', app.get('port'));
    console.log('Node environem nt set to ', ENVIRONMENT);
    console.log('Software version ', VERSION);
});

/**
 * ========================================================
 * ===================== WEBPACK ==========================
 * ========================================================
 */

// Use hot reloading middleware for dev
// TODO: handle other mode
if (mode === 'local') {
    const webpack = require('webpack');
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('./webpack.config');
    const compiler = webpack(webpackConfig);

    app.use(devMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: 'warn',
    }));

    app.use(hotMiddleware(compiler, {
        reload: true,
        timeout: 60000,
        autoConnect: true,
        heartbeat: 10000,
    }));
}

/**
 * ========================================================
 * ==================== SOCKET.IO =========================
 * ========================================================
 */

// Initiate socket.io server
const io = require('socket.io');

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });
});

io.listen(app.get('port'));
// Websockets messages
const blockcahin = require('./lib/websocket/blockcahin-manager')(services.getSeneca(), io);
