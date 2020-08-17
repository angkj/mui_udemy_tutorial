const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

const env = process.env.REACT_APP_ENV;

console.log(env);
console.log(port);

app.get('/ping', function (req, res) {
  return res.send('pong');
 });
 
 app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
 
 app.listen(process.env.PORT || 8080);