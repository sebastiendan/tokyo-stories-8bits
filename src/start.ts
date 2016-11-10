import app from './app';
require('./components');

import angular = require("angular");
import routeConfig = require("./route-config");
import themeConfig = require("./theme-config");
import refreshState = require("./refresh-state");
import soundConfig = require("./sound-config");

app.config(routeConfig).config(themeConfig).run(refreshState).run(soundConfig.playMusic).constant('sounds', soundConfig.sounds);

angular.element(document).ready(() => {
    angular.bootstrap(document, [app.name]);
});
