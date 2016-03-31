var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/*  logins collection
    polls collection
    voters collection
 */

module.exports = function Database(callback) {
  this.db = null;
  var self = this;

  mongo.connect(process.env.MONGO_URI, function(err, db) {
    if (err) return console.log(err);
    self.db = db;
    callback();
  });

  function variantPos(variant, poll) {
    variant = decodeURIComponent(variant);

    for (var i = 0 ; i < poll.variants.length; i++) {
        if (poll.variants[i].title === variant) {
          return i;
        }
    }
    return null;
  }


  this.updateUserPoll = function(body, cb) {
    var polls = db.collection('polls');

    polls.findOne({ _id : new ObjectId(body.id)}, function(err, data) {
      if (err) return cb(err);

      var update = data;
      update.variants = body.variants;

       if (data.clientId === body.clientId) {
          self.updatePoll(update, function(err, data) {
            if (err) return cb(err);

            cb(null, data);
          });
        } else {
          cb('no match');
        }
    });
  }

  this.deleteUserPoll = function(id, clientId, cb) {
    var polls = db.collection('polls');

    polls.findOne({ _id : new ObjectId(id)}, function(err, data) {
      if (err) return cb(err);

      if (data.clientId === clientId) {
        polls.remove({_id : new ObjectId(id)}, function(err, data) {
          if (err) return cb(err);
          cb(null, data);
        })
      }

    });
  }

  this.createPoll = function(data, cb) {
    var polls = db.collection('polls');
    polls.insert(data, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  }

  this.insertVoted = function(poll, client, cb) {
    var voters = db.collection('voters');

    voters.insert({ poll : poll, client : client}, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  }

  this.isVoted = function(poll, client, cb) {
    var voters = db.collection('voters');

    voters.findOne({ poll : poll, client : client }, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  }

  this.vote = function(body, cb) {
    self.fetchPoll(body.id, function(err, data) {
      if (err) return cb(err);

      try {
        data.variants[variantPos(body.variant, data)].voted += 1;

        self.updatePoll(data, function(err, data) {
          if (err) return cb(err);
          cb(null, data);
        });
      } catch(e) { cb(e); }

    });
  }

  this.updatePoll = function(data, cb) {
    var polls = db.collection('polls');

    polls.update({ _id : new ObjectId(data._id)}, { $set : data }, function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  }

  this.fetchPolls = function(cb) {
    var polls = db.collection('polls');

    polls.find({}).toArray(function(err, data) {
      if (err) return cb(err);

      var logins = data.map(function(d) { return d.clientId; });

      db.collection('logins').find({id : {$in : logins}}).toArray(function(err, users) {
        if (err) return cb(err);
        function getUser(id) {
          for(var i = 0; i < users.length; i++) {
            if (users[i].id === id) {
              return users[i];
            }
          }
          return null;
        }

        cb(null, data.map(function(d) {
          d.user = getUser(d.clientId);
          return d;
        }));
      });

    });
  }

  this.fetchPoll = function(id, cb) {
    var polls = db.collection('polls');

    polls.findOne({ _id : new ObjectId(id)}, function(err, poll) {
      if (err) return cb(err);

      db.collection('logins').find({id : poll.clientId}).toArray(function(err, user) {
        if (err) return cb(err);
        poll.user = user[0] || null;
        cb(null, poll);
      });
    });
  }

  this.createLogin = function(data, cb) {
    var logins = db.collection('logins');
    var userData = {
      id : data.id,
      login : data.login,
      image : data.avatar_url,
      name : data.name,
      location : data.location
    };
    logins.findOne({id : data.id}, function(err, data) {
      if (err) return cb(err);
      if (data === null) {
        logins.insert(userData, function(err, data) {
          if (err) return cb(err);
          cb(null, userData);
        })
      } else {
        cb(null, userData);
      }
    })
  };

  return this;
}
