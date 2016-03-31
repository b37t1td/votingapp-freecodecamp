var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var db = null;

app.use(session({ secret: 'votingAppCampsSess',
  saveUninitialized: true,
  resave : true,
   cookie: {
     secure: false,
     maxAge: 22909943600
   }
 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function(req,res) {
  res.redirect('/app/');
});

app.get(/^\/app\/?.*/, function(req, res){
  res.sendFile(path.resolve(__dirname +'/../public/app.html'));
});

app.use(function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	next();
});

app.get('/', function(req,res) {
  res.send(JSON.stringify(req.session.user)).end();
});


db = new require('./database')(function() {

  /* /api/auth */
  require('./auth')(app, db);

  /* /api/poll[s] */
  require('./polls')(app,db);

  app.listen(process.env.PORT, function() {
    console.log('Application started on :' + process.env.PORT);
  });
});
