angular.module('regUser',  ['userServices'] )
.controller('regUser', function($http, $location, $timeout, User){
  var app = this;
  this.registerUser = function(regData){
    app.errorMsg = false;
    console.log(this.regData);

    console.log('testing new button');
    User.create(app.regData).then(function(data){
      if(data.data.success){
        //create success message
        app.successMsg = data.data.message;
        //redirect
        $timeout(function(){
          $location.path('/');
        }, 2000);
      }else{
        //create warning message
        app.errorMsg = data.data.message;
      }
      console.log(data);
    });
  };
});
