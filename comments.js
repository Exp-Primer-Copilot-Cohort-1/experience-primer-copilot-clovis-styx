// Create web server for comments

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Use body-parser middleware to parse JSON body
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// GET request handler for /comments
app.get('/comments', function(req, res) {
  console.log("GET comments");
  // Read comments from file
  var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  // Send back comments
  res.send(comments);
});

// POST request handler for /comments
app.post('/comments', function(req, res) {
  console.log("POST comments");
  // Read comments from file
  var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  // Add new comment
  comments.push(req.body);
  // Write comments to file
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  // Send back comments
  res.send(comments);
});

// Listen on port 3000
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});