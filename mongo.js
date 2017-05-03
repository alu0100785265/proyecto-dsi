var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var app = express();
var cookieParser = require("cookie-parser");
var bcrypt = require("bcrypt-nodejs");
var path = require('path');
require('./models/user');
require('./Passport/passport')(passport);


mongoose.connect('mongodb://babel-alu0100785265.c9users.io/', 
  function(err, res) {
    if(err) throw err;
    console.log('Conectado con Ã©xito a la BD');
});

app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.session({ secret: 'secretkey' }));

// Configuración de Express
app.use(passport.initialize());
app.use(passport.session());

// Rutas de Passport
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', 
    failureRedirect: '/login' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', 
    failureRedirect: '/login' }));


exports.index = function(req, res){
  res.render('in', { 
    title: 'Passport-Example',
    user: req.user
  });
};
