"use strict";

module.exports = function (log, validate) {

    return {
        
        description: "Clean the code from the deployment ready for a fresh push.",
        
        dependsOn: [], 

        validate: function (config) {
            validate.config(config, 'dns-name');
            validate.config(config, 'vm-user');
            validate.config(config, 'vm-pass');
        },
        
        invoke: function (config) {
            var host = config.get('dns-name') + '.cloudapp.net';
            var user = config.get('vm-user');
            var pass = config.get('vm-pass');

            return azure.runProvisioningScripts(host, user, pass, './scripts/delete-remote-code-deployment.sh');
        },
    };
};