var clientH = require('./clientHash');

module.exports = function(app, db) {

  function compose(req, data) {
    return {
       data : data,
       meta :{
        userData : req.session.user
      }
    };
  }

  app.get('/api/polls', function(req, res) {
    db.fetchPolls(function(err, data) {
      if (err) return res.status(500).end();
      res.send(JSON.stringify(compose(req,data))).end();
    });
  });

  app.get('/api/poll/:id', function(req, res) {
    var client = clientH(req);

    db.fetchPoll(req.params.id, function(err, data) {
      if (err) return res.status(500).end();
      db.isVoted(req.params.id, client, function(err, voted) {
        if (err) return res.status(500).end();
        data = compose(req,data);

        if (voted !== null)  {
            data.meta.voted = true;
        }
        res.send(JSON.stringify(data));
      });
    });
  });

  app.post('/api/poll/:id', function(req,res) {
    if (typeof req.session.user === 'undefined') {
      return res.status(403).end();
    }

    var clientId = req.session.user.id;
    var data = req.body;
    data.id = req.params.id;
    data.clientId = clientId;

    db.updateUserPoll(data, function(err, data) {
      if (err) return res.status(403).end();
      res.send({}).end();
    });
  });

  app.delete('/api/poll/:id', function(req, res) {
    if (typeof req.session.user === 'undefined') {
      return res.status(403).end();
    }
    var clientId = req.session.user.id;

    db.deleteUserPoll(req.params.id, clientId, function(err, data) {
      if (err) return res.status(403).end();
      res.send({}).end();
    })
  });

  app.post('/api/poll', function(req,res) {
    var clientId = req.session.user.id;
    if (!clientId) return res.status(403).end();
    var data = req.body;
    data.clientId = clientId;

    db.createPoll(data, function(err, data) {
      if (err) return res.status(500).end();

      res.send({}).end();
    });

  });

 app.post('/api/vote/', function(req, res) {
   var client = clientH(req);
   var poll = req.body.id;

   db.isVoted(poll, client, function(err, data) {
     if (err) return res.status(500).end();
     if (data !== null) return res.status(403).end();

        db.vote(req.body, function(err, data) {
          if (err) return res.status(403).end();
          db.insertVoted(poll, client, function(err) {
            if (err) return res.status(500).end();
            res.send({}).end();
          })
        });
    });
 });

}
