"use strict";

module.exports = function (log, validate) {

    return {
        
        description: "Initialise the remote repo ready to receive fresh code.",
        
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

            return azure.runProvisioningScripts(host, user, pass, './scripts/hg/local/init-deployment-repo.sh');
        },
    };
};