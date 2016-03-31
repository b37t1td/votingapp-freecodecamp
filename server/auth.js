var githubOAuth = require('github-oauth')({
  githubClient: process.env.GITHUB_CLIENT_ID,
  githubSecret: process.env.GITHUB_CLIENT_SECRET,
  baseURL: process.env.BASE_URI,
  loginURI: '/api/auth/login',
  callbackURI: '/api/auth/callback',
  scope: ''
});

var request = require('request');

module.exports = function(app, db) {

  function authorizeAndSave(token, req, res) {
    request.get({
      url : 'https://api.github.com/user',
      json: true,
      headers : {
        'User-Agent': 'Voting App freeCodeCamps challenge',
        'Authorization': 'token ' + token
      }
    }, function(err, resp, body) {
      db.createLogin(body, function(err, data) {
        if (err) return res.status(500).end();
        req.session.user = data;
        res.redirect('/app');
      });
    });
  }

  app.get('/api/auth/login', function(req,res) {
      githubOAuth.login(req, res);
  });

  app.get('/api/auth/logout', function(req,res) {
    req.session.user = null;
    res.redirect('/app');
  });

  app.get('/api/auth/callback', function(req,res) {
    githubOAuth.callback(req, res);
  });

  githubOAuth.on('error', function(err) {
  });

  githubOAuth.on('token', function(token, res, rt, req) {
    if (typeof token.access_token !== 'undefined') {
      authorizeAndSave(token.access_token, req, res);
    } else {
      res.status(403).end();
    }
  });

}
