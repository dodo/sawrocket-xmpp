function pf(p,f){return function(n){return f(p+':'+n)}};

// hook core debugging to `debug`
require('util').debuglog = pf('core', require('debug'));

var xmpp = require('node-xmpp');
if (window) window.xmpp = xmpp;

// var client = new xmpp.Client({jid:"jid@domain.lit", password:"secret", host:"domain.lit", preferred:"PLAIN"})
// var client = new xmpp.Client({jid:"test@localhost", password:"test", host:"127.0.0.1", preferred:"PLAIN"})


var Lightstream = require('lightstream');
var xep = require('lightstream/xep');


window.startClient = function () {
    var lightstream = new Lightstream({
        backend:require('lightstream/backend/node-xmpp'),
    }).use(xep.Disco, xep.Presence, xep.Ping)
    .connect('test@localhost', 'test', {
        host:'127.0.0.1',
        preferred:'PLAIN',
    });


    lightstream.on('ping', function (stanza) {
    console.log("received a ping", stanza);
    });

    lightstream.on('info', function (stanza) {
    console.log("received a info disco query", stanza);
    });

    lightstream.on('presence', function (stanza) {
    console.log("received a presence", stanza);
    });


    lightstream.on('online', function () {
        console.log("online");
        lightstream.extension.presence.send({
            show:"chat",
            status:"Happily echoing your <message/> stanzas",
            from:lightstream.backend.client.jid,
        });
    });

    lightstream.router.match("self::message", function (stanza) {
        if (stanza.attrs.type === 'error') return; // never reply to errors
        console.log(stanza.toString())
        // Swap addresses...
        stanza.attrs.to = stanza.attrs.from;
        delete stanza.attrs.from;
        // and send back.
        lightstream.send(stanza);
    });
    return lightstream;
}
