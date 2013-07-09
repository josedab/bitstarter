var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

app.get('/hello2', function(request, response) {
  response.send('Hello World 2!');
});

/*
 *  Testing buffer behaviour with nodejs
 *
 *    Information got from 
 *    http://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers
 *
 *    Pure javascript, while great with unicode-encoded strings, does not handle 
 *    straight binary data very well. This is fine on the browser, where most data 
 *    is in the form of strings. However, node.js servers have to also deal with 
 *    TCP streams and reading and writing to the filesystem, both which make it 
 *    necessary to deal with purely binary streams of data.
 *
 *    One way to handle this problem is to just use strings anyway, which is exactly 
 *    what Node.js did at first. However, this approach is extremely problematic to 
 *    work with; It's slow, makes you work with an API designed for strings and not 
 *    binary data, and has a tendency to break in strange and mysterious ways.
 *
 *    Don't use binary strings. Use buffers instead!
 */
app.get('/', function(request, response) {
  var buffer = fs.readFileSync('index.html');
  response.send(buffer.toString());
});



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
