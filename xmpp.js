function noop(){};
function pf(p,f){return function(n){return f(p+':'+n)}};

// hook core debugging to `debug`
require('util').debuglog = pf('core', require('debug'));

var fs = require('fs');

// init dummy fs.watch
fs.FSWatcher = function FSWatcher() {};
fs.FSWatcher.prototype = {close:noop,on:noop};
fs.watch = function () {return new fs.FSWatcher};

// initialize dummy system files need for native-dns/lib/platform
fs.writeFile("/etc/hosts", [
    "127.0.0.1 localhost",
    "::1 localhost",
    ""].join('\n'), 'ascii', function (err) {
        if (err) console.error(err);
});
fs.writeFile("/etc/resolv.conf", [
    "nameserver 8.8.8.8",
    "nameeserver 8.8.4.4",
    ""].join('\n'), 'ascii', function (err) {
        if (err) console.error(err);
});

var xmpp = require('node-xmpp');
module.exports = xmpp;

if (typeof window !== 'undefined') window.xmpp = xmpp;

// var client = new xmpp.Client({jid:"jid@domain.lit", password:"secret", host:"domain.lit", preferred:"PLAIN"})
// var client = new xmpp.Client({jid:"test@localhost", password:"test", host:"127.0.0.1", preferred:"PLAIN"})
