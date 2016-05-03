var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

/*app.get('/hello', function(req, res){
 res.send('hello world');
 });*/

//var connectionString = 'mongodb://localhost/FormBuilderDB';
var connectionString = 'mongodb://localhost/ChanceDB';

//var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/FormBuilderDB';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/project/server/app.js")(app, db, mongoose);

require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);