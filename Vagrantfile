# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

    config.vm.box = "ubuntu/trusty64"

    config.vm.provision "shell", path: "./Deploy/scripts/mean-stack-provision.sh", privileged: false
    config.vm.provision "shell", path: "./Deploy/scripts/start-vagrant-server.sh", privileged: false, run: "always"

    config.vm.synced_folder "./", "/home/vagrant/deployment"

    config.vm.network "forwarded_port", guest: 3000, host: 30000
end
