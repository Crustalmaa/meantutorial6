var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';
module.exports = function(router){
  //console.log('module. exports');
  // User registration
  router.post('/registerUser', function(req, res){
    //console.log(req.body.email);
    var user = new User();
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    if(req.body.email == null || req.body.email == ''|| req.body.username == null || req.body.username == ''||
    req.body.password == null || req.body.password == ''){
      return res.json({success: false, message: 'Ensure you provided username, email, password completely.'});
    }else{
          user.save(function(err){
            if(err){
                return res.json({success: false, message : 'Email is already existed.'});
            }else{
              return res.json({success: true, message: 'User registered.'});
            }
          });
        }
  });
  //user login
  router.post('/authenticate', function(req, res){
    console.log('authenticate ');
    User.findOne({email: req.body.email}).select('email username password').exec(function(err, foundUser){
      console.log("before err if else");
      if(err){
        throw err;
      }else{
        console.log('before !foundUser if else');
        if(!foundUser){
          console.log('within !foundUser');
          return res.json({success: false, message: 'Could not authenticate user'});
        }else if(foundUser){
          if(req.body.password ==null || req.body.password == ''){
            console.log('password is empty');
            return res.json({success: false, message: 'Password is empty'});

          }else{
            console.log('password is not empty');
            var validPassword = foundUser.comparePassword(req.body.password);
            if(!validPassword){
              console.log('password is not valid.');
              return res.json( {success: false, message: 'could not authenticate user'});
            }else{
              console.log(' user authenticated.');
              console.log(foundUser);
              console.log(foundUser.username);
              var token = jwt.sign({username: foundUser.username, email: foundUser.email}, secret, {expiresIn: '24h'});
              return res.json({success: true, message: 'user authenticated.', token: token});
            }
          }

        }
      }
    });
  });
  router.use(function(req, res, next){
      var token = req.body.token || req.body.request || req.headers['x-access-token'];

      if(token)
      {
        //verify token
        jwt.verify(token, secret, function(err, decoded){
          if(err)
          {
            res.json({success: false, message: 'Token invalid.'});
          }else{
            req.decoded = decoded;
            next();
          }
        });
      }else{
        res.json({success: false, message: 'No token  provided.'});
      }
  });
  router.post('/me', function(req, res){
    res.send(req.decoded);
  });
  return router;
};
