"use strict";

// Pull in needed modules.
const debug = require('debug')('ApiServer');;
const restify = require('restify');
const errors = require('restify-errors');
const port = process.env.port || 3000;


// Initiate the Restify server.
const server = restify.createServer({
    name: 'NS8 API'
});


// Send a debug message for each received request.
server.pre((req, res, next) => {
    debug('Received a ' + req.method + ' ' + req.url + ' request.');
    return next();
});


// Use a body parser to make it much easier to process POST data.
server.use(restify.plugins.bodyParser());


// Define all the supported routes.
server.post('/users', (req, res, next) => {
    debug('Creating a new user');
    res.send(200);
    return next();
});

server.get('/users', (req, res, next) => {
    debug('Getting all users');
    res.send(200);
    return next();
});

server.get('/users/:user_id', (req, res, next) => {
    // This check is needed in order to handle the '/users/' case.
    if ( !req.params.user_id) {
        return next(new errors.BadRequestError('Please specify the user id.'));
    }
    debug('Getting user with user_id=' + req.params.user_id);
    res.send(200);
    return next();
});

server.post('/users/:user_id/events', (req, res, next) => {
    debug('Creating new event for user_id=' + req.params.user_id);
    res.send(200);
    return next();
});

server.get('/users/:user_id/events', (req, res, next) => {
    debug('Getting events for user_id=' + req.params.user_id);
    res.send(200);
    return next();
});

server.get('/users/events', (req, res, next) => {
    debug('Getting all events for all users');
    res.send(200);
    return next();
});


// Start the Restify server.
server.listen(port, () => {
    debug('The NS8 API is now running on port ' + port);
});
