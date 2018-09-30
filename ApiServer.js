"use strict";

// Pull in needed modules.
const debug = require('debug')('ApiServer');;
const restify = require('restify');
const errors = require('restify-errors');
const repo = require('./repository');


// Initiate the Restify server.
const server = restify.createServer({
    name: 'NS8 API'
});


// Send a debug message for each received request.
server.pre((req, res, next) => {
    debug('Received a ' + req.method + ' ' + req.url + ' request.');
    return next();
});


// Use Restify plugins to make it easier to process POST data and query string parameters.
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());


// Define all the supported routes.
server.post('/users', (req, res, next) => {
    debug('Creating a new user');
    try {
        const user = repo.addUser(req.body);
        res.send(200, user);
        return next();
    } catch (error) {
        return next(error);
    }
});

server.get('/users', (req, res, next) => {
    debug('Getting all users');
    res.send(200, repo.getAllUsers());
    return next();
});

server.get('/users/:user_id', (req, res, next) => {
    // This check is needed in order to handle the '/users/' case.
    if ( !req.params.user_id) {
        return next(new errors.BadRequestError('Please specify the user id.'));
    }
    debug('Getting user with user_id=' + req.params.user_id);
    try {
        const user = repo.getUserById(req.params.user_id);
        res.send(200, user);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.post('/users/:user_id/events', (req, res, next) => {
    debug('Creating new event for user_id=' + req.params.user_id);
    try {
        const event_id = repo.addEventForUser(req.params.user_id, req.body);
        res.send(200, event_id);
        return next();
    } catch (error) {
        return next(error);
    }
});

server.get('/users/:user_id/events', (req, res, next) => {
    debug('Getting events for user_id=' + req.params.user_id);
    try {
        const events = repo.getEventsByUserId(req.params.user_id);
        res.send(200, events);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.get('/users/events', (req, res, next) => {
    debug('Getting all events for all users');
    res.send(200, repo.getAllEvents(req.query.range));
    return next();
});


// Start the Restify server.
const port = process.env.port || 3000;
server.listen(port, () => {
    debug('The NS8 API is now running on port ' + port);
});
