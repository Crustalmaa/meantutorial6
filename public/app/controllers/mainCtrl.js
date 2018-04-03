angular.module('mainController', ["authServices"])
.controller('mainCtrl', function($http, $location, $timeout, Auth, $rootScope){
  var app = this;
  app.loadme= false;
  //chiglel oorchlogdohguut auto refresh hiigdene.
  $rootScope.$on('$routeChangeStart', function(){
    if(Auth.isLoggedIn()){
      app.isLoggedIn = true;
    //  console.log('Success: user logged in.');
      app.loadme=true;
      Auth.getUser().then(function(data){
        //  console.log(data.data.username);
          app.username = data.data.username;
          app.email = data.data.email;

      });
    }else{
      app.isLoggedIn = false;
  //    console.log('Failure: user is not logged in.');
      app.username = 'User';
      app.loadme = true;
    }
  //  if($location.hash() == '_=_')
  //    $location.hash(null);
  });




  this.doLogin = function(loginData){
    app.errorMsg = false;
    console.log('before Auth login');
    Auth.login(app.loginData).then(function(data){
      console.log(data);
      if(data.data.success){
                console.log('login form submitted.');
        //create success message
        app.successMsg = data.data.message;
        //redirect to about pages
        $timeout(function(){

          $location.path('/about');
          app.loginData = '';
          app.successMsg = false;
        }, 2000);
      }else{
        // create error message
        app.errorMsg = data.data.message;
      }
    });

  };
  this.logout = function(){
    Auth.logout();
    $location.path('/logout');
    $timeout(function(){
      $location.path('/');
    }, 2000);
  };
//  console.log('testing main ctrl');
});
