require('./initrd');

var xmpp = require('node-xmpp');
module.exports = xmpp;

if (typeof window !== 'undefined') window.xmpp = xmpp;

// var client = new xmpp.Client({jid:"jid@domain.lit", password:"secret", host:"domain.lit", preferred:"PLAIN"})
// var client = new xmpp.Client({jid:"test@localhost", password:"test", host:"127.0.0.1", preferred:"PLAIN"})
