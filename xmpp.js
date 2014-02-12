function pf(p,f){return function(n){return f(p+':'+n)}};

// hook core debugging to `debug`
require('util').debuglog = pf('core', require('debug'));

var xmpp = require('node-xmpp');
if (window) window.xmpp = xmpp;

// var client = new xmpp.Client({jid:"jid@domain.lit", password:"secret", host:"domain.lit", preferred:"PLAIN"})
