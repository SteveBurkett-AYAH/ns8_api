"use strict";

// Pull in needed modules.
const debug = require('debug')('Repository');;

class Repository {

    constructor() {
        // Use local internal private variables because the data does not need to persist between server restarts.
        this._users = [];
        this._events = [];
    }

    _findUserById(user_id) {
        debug('Finding user with user_id=' + user_id);
        const user = this._users.find(user => user.id == user_id);
        if ( !user) {
            throw new Error('User not found.');
        }
        return user;
    }

    _getNextUserId() {
        return this._users.length + 1;
    }

    addUser(data) {
        data.id = this._getNextUserId();
        this._users.push(data);
        debug('Added new user with id=' + data.id);
        return data;
    }

    addEventForUser(user_id, data) {
        if (this._findUserById(user_id)) {
            data.user_id = parseInt(user_id);
            data.created = (new Date()).getTime();
            this._events.push(data);
            return data;
        }
    }

    getAllUsers() {
        debug('Getting all users.');
        return this._users;
    }

    getAllEvents(range) {
        // Force range to be a string.
        range = range || "";
        
        switch (range.toLowerCase()) {
            case "last_day":
                debug('Getting all events for the last day for all users.');
                const yesterday = (new Date()).getTime() - (60*60*24);
                return this._events.filter(event => event.created >= yesterday);
                break;
            default:
                debug('Getting all events for all users.');
                return this._events;
        }
    }

    getUserById(user_id) {
        debug('Getting user with user_id=' + user_id);
        return this._findUserById(user_id);
    }

    getEventsByUserId(user_id) {
        if ( this._findUserById(user_id)) {
            debug('Getting the events for user_id=' + user_id);
            return this._events.filter(event => event.user_id == user_id);
        }
    }
}

module.exports = new Repository;
