"use strict";


var express = require('express');
var app = express();
var bcrypt = require("bcrypt-nodejs");
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Strategy = require('passport-github').Strategy;
var fs = require('fs-extra');
var boolGithub = false;
var boolLocal = false;


var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: '4da3fc9817dc296aee71',
    clientSecret: '0ef3f4b8fe00806df1ef8f734e2a47332918830f',
    callbackURL: "'https://babel-alu0100785265.c9users.io/login/github/return'"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'gh-pages')));

app.set('port', (process.env.PORT || 8080));

app.set('view engine', 'ejs');



app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
//routes

app.get('/login', function (req, res) {

  if (req.user) {

    app.get('/profile', function (req, res) {
      res.render('home');
    });
  }

  res.render('login');
});




app.get('/', function (req, res) {

  res.render('home', {
    user: req.user
  });

});

app.get('/book', function (req, res) {
  if (req.user && (boolGithub || boolLocal))
    res.sendfile('gh-pages/juanito.html');
  else if (req.user)
    res.render('error');
  else
    res.render('login');



});

app.get('/loginLocal', function (req, res) {
  res.render('loginLocal');
});

app.get('/home', function (req, res) {
  res.render('home', {
    user: req.user
  });
});

app.get('/cambiarpass', function (req, res) {
  res.render('cambiarpass');

});

app.get('/registro', function (req, res) {
  res.render('registro', {
    user: req.user
  });
});


app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {
  res.render('profile', {
    user: req.user
  });
});



// Crear puesto de escucha
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
  console.log('Node app ejecutandose en el puerto', app.get('port'));
});
