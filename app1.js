"use strict";


var express = require('express');
var app = express();
var bcrypt = require("bcrypt-nodejs");
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Strategy = require('passport-github').Strategy;
var fs = require('fs-extra');
//var pck = require('../package.json');
var boolGithub = false;
var boolLocal = false;



passport.use(new Strategy({
  clientID: '4da3fc9817dc296aee71',
  clientSecret: '0ef3f4b8fe00806df1ef8f734e2a47332918830f',
  callbackURL: 'http://localhost:8089/login/github/return'
}, function (accessToken, refreshToken, profile, cb) {
  var token = require('./token.json');
  var github = require('octonode');
  var client = github.client(token.token);
  var ghorg = client.org('ULL-ESIT-DSI-1617');
  ghorg.member(profile.username, function (err, bool) {
    //console.log(JSON.stringify(bool,null,4));
    boolGithub = bool;
    if (err) console.log(err);
  });
  return cb(null, profile);
}));
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
        consumerKey: 'llaoII8ao14jSMHrhHCHCVWeC',
        consumerSecret: 'hEYxgG3oxjDR0R1t9EWZ98tBKZ1IlVacHAQn5LDuvCIgzJbc9q',
        callbackURL: "http://10.6.128.170:8089/login/twitter/return"
    },
    function(token, tokenSecret, profile, done) 
    {
        done(null, profile);
    }
));
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID      : '1416333221758942',
    clientSecret  : 'f5f30eca089742b5757af51489cea257',
callbackURL : 'http://10.6.128.170:8089/login/facebook/return'
},
    function(token, tokenSecret, profile, done) 
    {
        done(null, profile);
    }
));


function buscarNombre(usuario, password, cb) {
    db.each("SELECT * FROM users", function (err, rows) {
        return new Promise((res, rej) => {

          if (err) {
            res(cb(null));
          }
          else {
            if ((rows.username == usuario) && (bcrypt.compareSync(password, rows.pass))) {
              boolLocal = true;
              res(cb(null, rows));
            }
          }

        });
    if (!boolLocal) {
        cb(null);
          }
      });
}




passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  function (username, password, done) {
    buscarNombre(username, password, function (err, user) {
      if (err) {
        return done(err, null);
      }
      else {
        return done(null, user);
      }
    });
  }
));


var sqlite3 = require('sqlite3').verbose(),
  db = new sqlite3.Database('baseDatos');

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, pass TEXT)');
  var stmt = db.prepare('INSERT INTO users (username, pass) VALUES (?, ?)');
    stmt.run('jose', bcrypt.hashSync('jose'));
    stmt.finalize();

});


// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, '_book')));

app.set('port', (process.env.PORT || 8080));

app.set('view engine', 'ejs');



app.use(passport.initialize());
app.use(passport.session());

//routes


app.get('/', function (req, res) {

  res.render('home', {
    user: req.user
  });

});

app.get('/book', function (req, res) {
  if (req.user && (boolGithub || boolLocal))
    res.sendfile('_book/ap.html');
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

app.get('/login', function (req, res) {

  if (req.user) {

    app.get('/profile', function (req, res) {
      res.render('home');
    });
  }

  res.render('login');
});

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return', passport.authenticate('twitter', {
  failureRedirect: '/login'
}), function (req, res) {
  res.redirect('/');
});


app.get('/login/github', passport.authenticate('github'));

app.get('/login/github/return', passport.authenticate('github', {
  failureRedirect: '/login'
}), function (req, res) {
  res.redirect('/');
});
app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/return', passport.authenticate('facebook', {
  failureRedirect: '/login'
}), function (req, res) {
  res.redirect('/');
});/*
app.get('/login/twitter', passport.authenticate('twitter'));
app.get('/login/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/login' }
));

*/

app.post('/auth', passport.authenticate('local', {
  failureRedirect: "/login"
}), function (req, res) {
  res.redirect("/");
});






app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {
  res.render('profile', {
    user: req.user
  });
});

app.post('/guardar', function (req, res) {

  if (req.body.Password == req.body.Password2) {
      db.each("SELECT * FROM users", function (err, rows) {
        if (err) {
          throw err;
        }
        else {

            if(rows.username != req.body.UserName ){
              var stmt = db.prepare('INSERT INTO users (username, pass) VALUES (?, ?)');
                stmt.run(req.body.UserName, bcrypt.hashSync(req.body.Password));
                stmt.finalize();

            }
            else{
                console.log("aquiiiii");
            }
        }
       });


  }

  else {
    res.render('registro');
  }
  res.redirect('/');
});

app.post('/cambiarpass', function (req, res) {

  var name = req.body.UserName;
  let passw = req.body.Password;
  let passwnew = req.body.Passwordnew1;
  let passwnew1 = req.body.Passwordnew2;

  if(passwnew == passwnew1){

      db.each("SELECT * FROM users", function (err, rows) {
        if (err) {
          throw err;
        }
        else {

            if(rows.username == name && bcrypt.compareSync(passw, rows.pass) ){

              db.run("UPDATE users SET pass ='" +   bcrypt.hashSync(passwnew) + "'  WHERE username ='"+ name + "'");

            }

        }
       });

  }


  else {
    res.render('registro');
  }
  res.redirect('/');

});


// Crear puesto de escucha
app.set('port', (process.env.PORT || 8089));
app.listen(app.get('port'), function() {
  console.log('Node app ejecutandose en el puerto', app.get('port'));
});
