var nmap = require('node-libnmap');
var request = require('request');
var selfAddress = require('./lib/ip.address').address;
var opts = {
      range: [
        '192.168.1.146-214'
      ],
      ports: '8887'
    };

console.log('scanning...'); 
nmap.scan(opts, function(err, report) {
  if (err) throw new Error(err);
  report = report['192.168.1.146-214'].host;
  report.forEach(function(item) {
    var ipAddress = item.address[0].$.addr;
    var port = item.ports[0].port[0].$.portid;
    var portStatus = item.ports[0].port[0].state[0].$.state;
    var reason = item.ports[0].port[0].state[0].$.reason;

    if (ipAddress === selfAddress) {
      return console.log(ipAddress, '(self)');
    } else {
      console.log(ipAddress, port, 'state:', portStatus, reason);
    }

    if (portStatus !== 'closed') {
      request('http://' + ipAddress + ':8887/ping', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body); // Show the HTML for the Google homepage. 
        } else {
          console.log(error);
        }
      });
    }
  });
});