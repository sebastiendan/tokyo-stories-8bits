import angular = require('angular');
import {IRootScopeService, IWindowService} from 'angular';
import {IStateService} from 'angular-ui-router';

export = ['$state', '$rootScope', '$window', ($state: IStateService, $rootScope: IRootScopeService, $window: IWindowService) => {
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      if (fromState.name == 'level-page') {
        $window.location.reload();
      };
    });
}];
