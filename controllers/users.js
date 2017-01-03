'use strict';

var express = require('express');
var UsersService = require('../services/users');

class UsersController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/:id', this.getSingleUser.bind(this));
        this.router.post('/', this.postUser.bind(this));
        this.router.put('/:id', this.putUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));
    }

    getUsers(req, res) {

        var users = UsersService.getUsers()
                        .then(function(contents) {
                            res.send(contents);
                        })
                        .catch(function(err) {
                            console.log('err', err);
                        });

    }

    getSingleUser(req, res) {
        
        var id = req.params.id;

        //console.log('id in req: ', id);

        var user = UsersService.getSingleUser(id)
                        .then(function(contents) {
                            res.send(contents);
                        })
                        .catch(function(err) {
                            console.log('err', err);
                        });
    }

    putUser(req, res) {

        //console.log('req.body: ', req.body);
        var id = req.params.id;
        var userInfo = req.body;

         var user = UsersService.updateUser(id, userInfo)
                        .then(function(contents) {
                            res.send(contents);
                        })
                        .catch(function(err) {
                            console.log('err', err);
                        });

    }

    postUser(req, res) {
        
        var userInfo = req.body;

        var user = UsersService.addUser(userInfo)
                        .then(function(contents) {
                            res.send(contents);
                        })
                        .catch(function(err) {
                            console.log('err', err);
                        });

    }

    deleteUser(req, res) {

        var id = req.params.id;

        var user = UsersService.deleteUser(id)
                        .then(function(contents) {
                            res.send(contents);
                        })
                        .catch(function(err) {
                            console.log('err', err);
                        });

    }
}

module.exports = UsersController;