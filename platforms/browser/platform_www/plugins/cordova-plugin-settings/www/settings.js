cordova.define("cordova-plugin-settings.settings", function(require, exports, module) { var exec = require('cordova/exec');

module.exports = {
    openSettings: function() {
        exec(null, null, "Settings", "openSettings", []);
    }
};
});
