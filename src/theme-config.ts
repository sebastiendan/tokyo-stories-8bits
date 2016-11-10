import angular = require('angular');

export = ['$mdThemingProvider', '$mdIconProvider', ($mdThemingProvider: any, $mdIconProvider: any) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue')
    .accentPalette('red');

  $mdIconProvider.fontSet('md', 'material-icons');
}];
