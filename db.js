//var MongoClient = require('mongodb').MongoClient;
var Promise = require("bluebird");
var Mongo = Promise.promisifyAll(require('mongodb'));
var MongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;
var USERS_COLLECTION = "users";

var state = {
  db: null,
  objectId: null,
  users: null
}

exports.connect = function(url, done) {
  if (state.db) return done();
  
  MongoClient.connectAsync(url)
    .then(function (db) { // <- db as first argument
      state.db = db;
      state.objectId = Mongo.ObjectID;
      state.users = db.collection(USERS_COLLECTION);
      done();
    })
    .catch(function (err) {
      return done(err);
    });
}

exports.get = function() {
  return state;
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      state.users = null;
      done(err);
    });
  }
}