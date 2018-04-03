//var app =
angular.module('appRoutes', ["ngRoute"])
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/home', {
    templateUrl: 'app/views/pages/home.html'
  })
  .when('/about', {
    templateUrl: 'app/views/pages/about.html'
  })
  .when('/register', {
    templateUrl: 'app/views/pages/users/register.html',
    controller: "regUser",
    controllerAs: "registerAs",
    authenticated: false
  })
  .when('/question', {
    templateUrl: 'app/views/pages/question/question.html'
  })
  .when('/askquestion', {
      templateUrl: 'app/views/pages/question/askqustion.html',
    //  controller: "askQuesCont",
    //  controllerAs: "askQuesContAs",
      authenticated: true
  })
  .when('/login', {
    templateUrl: 'app/views/pages/users/login.html',
    authenticated: false
  })
  .when('/logout', {
    templateUrl: 'app/views/pages/users/logout.html',
    authenticated: true
  })
  .when('/profile', {
    templateUrl: 'app/views/pages/users/profile.html'
    , authenticated: true
  })
  .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $locationProvider.hashPrefix('');
});
/*
app.run(['$rootScope', function($rootScope){
  $rootScope.$on('$routeChangeStart', function(event, next, current){
//    console.log(next.$$route);
    if(next.$$route){
      console.log(next.$$route.authenticated);
    }else{
      console.log('next.$$route not defined.');
    }
  });
}]);
*/
