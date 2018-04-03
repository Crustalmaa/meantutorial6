angular.module('userServices', [])
.factory('User', function($http){
  userFactory = {};
  userFactory.create = function(regData){
    return $http.post('/api/registerUser', regData);
  }
  return userFactory;
});
