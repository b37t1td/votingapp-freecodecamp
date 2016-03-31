module.exports = function(req) {
  function jenkinsHash(str) {
    for (var hash = 0, i = 0, len = str.length; i < len; ++i) {
        hash += (str.charCodeAt(i) >>> 0);
        hash = hash >>> 0
        hash += ((hash << 10) >>> 0);
        hash = hash >>> 0
        hash ^= ((hash >>> 6) >>> 0);
        hash = hash >>> 0
    }
    hash += ((hash << 3) >>> 0);
    hash = hash >>> 0
    hash ^= ((hash >>> 11) >>> 0);
    hash = hash >>> 0
    hash += ((hash << 15) >>> 0);
    hash = hash >>> 0
    return hash >>> 0;
  }

  function getClientAddress(req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
  }

  var clientStr = getClientAddress(req) + req.headers['user-agent'];

  return jenkinsHash(clientStr);

}
