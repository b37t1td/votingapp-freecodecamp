var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var db = null;

app.use(session({ secret: 'votingAppCampsSess',
  saveUninitialized: true,
  resave : true,
   cookie: {
     secure: false,
     maxAge: 909943600
   }
 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override');
	next();
});

/* /api/auth */
require('./auth')(app, db);

db = new require('./database')(function() {
  app.listen(process.env.PORT, function() {
    console.log('Application started on :' + process.env.PORT);
  });
});
