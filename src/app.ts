import angular = require('angular');
require('script!../hexi.min.js');
require('angular-ui-router');
require('angular-material');
require('../angular-typewrite.js');

require('../node_modules/angular-material/angular-material.min.css');
require('./common/styles/elements.scss');

export default angular.module('tokyo-stories-8bits', ['ui.router', 'ngMaterial', 'angularTypewrite']);
