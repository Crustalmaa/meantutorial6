angular.module('userApp', ["appRoutes" , "regUser", "userServices", "mainController", "authServices", "askQuesCont"])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors');
//  if(config){
  //  console.log('config is existing ');
  //}else{
  //  console.log('config is not existing.');
  //}
});
