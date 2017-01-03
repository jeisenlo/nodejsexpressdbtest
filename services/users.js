'use strict';

//var uuid = require('node-uuid');
var db = require('../db');
var Promise = require('bluebird');


class UsersService {
    constructor() {
        this.users = [];
    }

    getUsers() {

        var self = this;

        return new Promise(function(resolve, reject) {

            db.get().users.find({}).toArray(function(err, docs) {
                if (err) {
                    reject(err);
                } else {
                    self.users = docs;
                    resolve(self.users);
                }
            });

        });

    }

    getSingleUser(id) {
        
        //if (typeof(userId) === 'undefined') return null;

        return new Promise(function(resolve, reject) {

            db.get().users.findOne({ _id: new db.get().objectId(id) }, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });

        });

    }

    updateUser(id, info) {

        //if (typeof(id) === 'undefined') return null;

        return new Promise(function(resolve, reject) {

            db.get().users.updateOne({_id: new db.get().objectId(id)}, {$set: info}, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });

        });

    }

    addUser(info) {
        var self = this;
        // TODO: prevent a bit of bad/duplicate data

        //info.id = uuid.v4(); <- if you want to create your own id

        console.log('info: ', info);

        return new Promise(function(resolve, reject) {

            db.get().users.insert(info, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    self.users.push(info);
                    resolve(doc);
                }
            });

        });
        
    }

    deleteUser(id) {
        var self = this;

        return new Promise(function(resolve, reject) {

            db.get().users.remove({_id: new db.get().objectId(id)}, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    // Remove user from this.users array... not sure about performance once there are a lot of users
                    self.users = $.grep(data, function(e) { 
                         return e.id !== id; 
                    });

                    resolve(doc);
                }
            });

        });


    }
}

module.exports = new UsersService();