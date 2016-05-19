"use strict";

module.exports = function (log, validate) {

    return {
        
        description: "Provision the mean stack that runs scraper and web server.",
        
        dependsOn: [], 

        validate: function (config) {
            validate.config(config, 'dns-name');
            validate.config(config, 'vm-name');
            validate.config(config, 'vm-user');
            validate.config(config, 'vm-pass');
            validate.config(config, 'vm-location');
            validate.config(config, 'vm-image');
            validate.config(config, 'vm-provision-script');
            validate.config(config, 'ssh-key');
            validate.config(config, 'vm-size');
            validate.config(config, 'vm-endpoints');
        },
        
        //
        // Invoke the task. Peform the operations required of the task.
        // Throw an exception to fail the build.
        // Return a promise for async tasks.
        //
        invoke: function (config) {
            var networkName = config.get('vm-network');
            var vm = {
                dnsName: config.get('dns-name'),
                name: config.get('vm-name'),
                location: config.get('vm-location'),
                imageName: config.get('vm-image'),
                user: config.get('vm-user'),
                pass: config.get('vm-pass'),
                endpoints: config.get('vm-endpoints'),
                provisionScript: config.get('vm-provision-script'),
                provisioningTemplateView: {},
                sshCertFile: config.get('ssh-key'),
                vmSize: config.get('vm-size'),
            };

            return azure.provisionVM(vm);
        },
    };
};