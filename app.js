var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '8887';

/**
 * Create HTTP server.
 */

var server = http.createServer(function(req, res) {
  console.log(req.url);
  res.end('ACK');
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function() {
  console.log('server listening @ %s:%d', '0.0.0.0', port);
});