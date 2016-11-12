import angular = require('angular');

export = [
  "$stateProvider", "$httpProvider", "$urlRouterProvider", "$locationProvider", ($stateProvider: angular.ui.IStateProvider,
    $httpProvider: angular.IHttpProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) => {

      $stateProvider
        .state('home-page', {
          url: '/',
          views: {
            'header': { template: '<header-block></header-block>' },
            'main': { template: '<home-page></home-page>' }
          }
        })
        .state('levels-page', {
          url: '/levels',
          views: {
            'header': { template: '<header-block></header-block>' },
            'main': { template: '<levels-page></levels-page>' }
          }
        })
        .state('level-page', {
          url: '/level/:level',
          views: {
            'header': { template: '<header-block></header-block>' },
            'main': { template: '<level-page></level-page>' }
          }
        });

      $urlRouterProvider.otherwise("/");
      $locationProvider.html5Mode(true);

  }
];
