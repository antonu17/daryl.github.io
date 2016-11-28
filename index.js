
var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.use(function(req, res, next) {
  if(req.url != '/') return next();
  res.sendFile('index.html');
});

app.use(function(req, res, next) {
  if(req.url != '/about') return next();
  res.sendFile('about.html');
});

app.listen(process.env.PORT || 9292);

