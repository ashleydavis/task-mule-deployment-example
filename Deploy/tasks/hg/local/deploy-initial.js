"use strict";

module.exports = function (log, validate) {

    var SshClient = require('ssh-promise');
    var del = require('promised-del');

    return {

        description: "Copy initial code to the server",
        
        dependsOn: function (config) {
            var deps = [];

            if (config.get('clean')) {
                deps.push('clean-code');
                deps.push('init-remote-repo');
            }

            return deps;
        },

        validate: function (config) {
            validate.config(config, 'dns-name');
            validate.config(config, 'vm-user');
            validate.config(config, 'vm-pass');
            validate.config(config, 'ssh-privateKey');
        },
        
        invoke: function (config) {
            var vmUser = config.get('vm-user');
            var vmPass = config.get('vm-pass');
            var vmUrl = config.get('dns-name') + '.cloudapp.net';
            var sshPrivateKey = config.get('ssh-privateKey');

            var sshConfig = {
                host: vmUrl,
                username: vmUser,
                password: vmPass, //todo: use the ssh key rather than the password.
            };
            var ssh = new SshClient(sshConfig);

            var bundleArgs = ["bundle", "--all", "bundle.hg", "--profile", "--time"];
            return runCmd('hg', bundleArgs) // Bundle repo.
                .then(function () {
                    var scpArgs = ["-i", sshPrivateKey, "-o", "StrictHostKeyChecking no", "-v", "bundle.hg", vmUser + '@' + vmUrl + ":bundle.hg"];
                    return runCmd('scp', scpArgs);                   
                })
                .then(function () {
                    // Unbundle remotely.
                    return ssh.exec("cd ~/deployment && hg unbundle ../bundle.hg");
                })
                .then(function () {
                    // Update on the remote machine.
                    return ssh.exec("cd ~/deployment && hg update");
                })
                .then(function () {
                    // Delete the bundle on the remote machine.
                    return ssh.exec("rm ./bundle.hg");
                })
                .then(function () {
                    // Delete the bundle on the local machine.
                    return del("bundle.hg");
                });
        },
    };
};