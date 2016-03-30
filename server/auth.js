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

  app.get('/api/auth/login', function(req,res) {
      githubOAuth.login(req, res);
  });

  app.get('/api/auth/callback', function(req,res) {
    githubOAuth.callback(req, res);
  });

  githubOAuth.on('error', function(err) {
    console.error('there was a login error', err)
  });

  githubOAuth.on('token', function(token, res) {
    console.log('here is your shiny new github oauth token', token)

    request.get({
      url : 'https://api.github.com/user',
      json: true,
      headers : {
        'User-Agent': 'request',
        'Authorization': 'token ' +token.access_token
      }
    },
      function(err, resp, body) {
        console.log(body);
        res.end(JSON.stringify(token));
    });
  });

}
