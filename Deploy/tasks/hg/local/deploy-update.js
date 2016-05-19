"use strict";

module.exports = function (log, validate) {

    return {

        description: "Deploy code to the server",
        
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
            validate.config(config, 'deploy:hg:local:code-repo');
        },
        
        invoke: function (config) {
            var vmUser = config.get('vm-user');
            var vmPass = config.get('vm-pass');
            var vmUrl = config.get('dns-name') + '.cloudapp.net';
            var codeRepoPath = config.get('deploy:hg:local:code-repo');

            var sshConfig = {
                host: vmUrl,
                username: vmUser,
                password: vmPass, //todo: use the ssh key rather than the password.
            };
            var ssh = new SshClient(sshConfig);

          var args = [
                'push', 
                'ssh://' + vmUser + '@' + vmUrl + '/deployment',
                '--cwd',
                codeRepoPath,
                '--debug'
            ];

            return runCmd('hg', args)
                .then(function () {
                    // Update on the remote machine.
                    return ssh.exec("cd ~/deployment && hg update");
                });
      },
    };
};