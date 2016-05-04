var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
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

var connectionString = 'mongodb://localhost/FormBuilderDB';
//var connectionString = 'mongodb://localhost/ChanceDB';

//var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/FormBuilderDB';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// Assignment & Project
var assignmentUserModel = require("./public/assignment/server/models/user.model.server.js")(db, mongoose);
var projectUserModel = require("./public/project/server/models/user.model.server.js")(db, mongoose);

require("./public/assignment/server/app.js")(app, db, mongoose, passport, LocalStrategy, assignmentUserModel);

require("./public/project/server/app.js")(app, db, mongoose, passport, LocalStrategy, projectUserModel);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    if (user.status) {
        projectUserModel
            .findById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }else{
        assignmentUserModel
            .findById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }
}

app.listen(port, ipaddress);