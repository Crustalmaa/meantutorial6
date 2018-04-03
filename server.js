var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var appRoutes = require('./app/routes/api')(router);
var passport = require('passport');
  var social = require('./app/passport/passport')(app, passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+ '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/meantutorial4', function(err){
  if(err){
    console.log('Can not connect to the database '+ err);
  }else{
    console.log('Successfully connected to the database. on 27017');
  }
});
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.get('/user', function(req, res){
  var user = new User();
  user.username = "username";
  user.email = "email";
  user.password = "password";
  if(user.username == null || user.username == ''||
  user.email == null || user.email == ''||
  user.password ==null || user.password == ''){
  res.send('Ensure user input username, password, email provided.');
  }else{
      user.save(function(err){
        if(err){
          res.send('User already existed. ');
        }else{
          res.send('Inserted user.');
        }
      });
    }
      res.send('This is home');
    });


app.listen(port, function(){
    console.log('Running the server in ' + port);
});
