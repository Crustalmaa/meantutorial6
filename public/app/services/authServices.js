angular.module('authServices', [])
.factory("Auth", function($http, AuthToken){
  authFactory = {};
  authFactory.login = function(loginData){
  //  console.log("auth factory login");
    return $http.post('/api/authenticate', loginData).then(function(data){
      AuthToken.setToken(data.data.token);
//      console.log(data);
      return data;
    });
  };
  //Auth.isLoggedIn
  authFactory.isLoggedIn = function(){
    if(AuthToken.getToken())
    {
      return true;
    }else{
      return false;
    }
  };
  authFactory.logout = function(){
    AuthToken.setToken(null);
  };
  //Auth.getUser()
  authFactory.getUser = function(){
    if(AuthToken.getToken()){
      return $http.post('/api/me');
    }else{
      $q.reject({message: 'User has no token'});
    }
  };
  return authFactory;

})
.factory("AuthToken", function($window){
  var AuthTokenFactory = {};
  //AuthToken.setToken(token);
  AuthTokenFactory.setToken = function(token){
    if(token){
      $window.localStorage.setItem('token',token);
    }
    else{
      $window.localStorage.removeItem('token');
    }
  };
  //AuthToken.getToken();
  AuthTokenFactory.getToken = function(){
    return $window.localStorage.getItem('token');
  };
  return AuthTokenFactory;
})
.factory("AuthInterceptors", function(AuthToken){
  var AuthInterceptorsFactory = {};
  AuthInterceptorsFactory.request = function(config){

    var token = AuthToken.getToken();
    if(token){
      config.headers['x-access-token'] = token;
    }else{

    }
  //  console.log(config);
    return config;
  };

  return AuthInterceptorsFactory;
})
;
