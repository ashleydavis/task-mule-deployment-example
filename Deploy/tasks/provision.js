"use strict";

module.exports = function (log, validate) {
    
    return {
        
        description: "Provision VM and deploy code",
        
        dependsOn: function (config) {
        	var deps = [];
        	deps.push('provision-vm');

        	var deploySource = config.get('deploy-source');

        	if (!deploySource) {
        		throw new Error("'deploy-source' is not defined in config or on command-line.");
        	}

        	log.verbose('Deploying from ' + deploySource);

        	if (deploySource === 'hg-local') {
	    		deps.push('hg/local/init-deployment-repo');
        		deps.push('hg/local/deploy-initial');
        	}
        	else if (deploySource === 'hg-remote') {
        		deps.push('hg/remote/deploy-initial');
        	}
        	else if (deploySource === 'git-remote') {
        		deps.push('git/remote/deploy-initial');
        	}
        	else {
        		throw new Error('Unrecognised deployment source: ' + deploySource);
        	}

            deps.push('install-server');
    		deps.push('start-server');
	        return deps;
	    },
  };
};