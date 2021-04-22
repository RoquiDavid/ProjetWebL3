const path = require('path');
const api = require('./api.js');
const apiFriend = require('./apiFriend.js');
var Datastore = require('nedb');
dbMessage = new Datastore();


// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const sqlite3 = require('sqlite3').verbose();
let dbUsers = new sqlite3.Database(':memory:');
let dbFriends = new sqlite3.Database(':memory:');


express = require('express');
const app = express()
api_1 = require("./api.js");
api_2 = require("./apiFriend.js");
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks"
}));

app.use('/api', api.default(dbUsers));
app.use('/apiFriend', apiFriend.default(dbFriends));
// Démarre le serveur
app.on('close', () => {
});
exports.default = app;