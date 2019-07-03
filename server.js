'use strict'

const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  env = require('node-env-file'),
  cors = require('cors'),
  User = require('./api/models/userModel'),
  Loan = require('./api/models/loanModel');

env(__dirname + '/.env');

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/zinobeapi', {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));


const routes = require('./api/routes/appRoutes');
routes(app);

app.use((req, res) => {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
});

app.listen(port);

console.log('RESTful API server started on: ' + port);