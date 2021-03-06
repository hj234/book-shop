'use strict'

var Hapi = require('hapi'),
    Config = require('config'),
    Mongoose = require('mongoose');

// Create a server with validation
var server = new Hapi.Server({
    app: {
        validation: {
            allowUnknown: true
        }
    }
});

// Set the port and CORS to true
server.connection({
    port: Config.server.port,
    routes: {
        cors: {
            origin: ['*'],
            credentials: true
        }
    }
});

// Use Bluebird as Promise Engine for Mongoose
Mongoose.Promise = require('bluebird');

// Connect to MongoDB database
Mongoose.connect(Config.database.uri);

// Load schemas
require('schemas')();

// Log (to console & file) configuration
const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        file: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./logs/' + new Date().getTime() + '.json']
        }]
    }
};

// Routes
require('routes')(server);

// Queues
require('queues')();

// Register and if no errors start the server
server.register({
    register: require('good'),
    options
}, (err) => {

    // Error loading the configuration
    if (err) {
        return console.error(err);
    }

    // Starting the server
    server.start(() => {
        console.info('Server started @', server.info.uri);
    });

});