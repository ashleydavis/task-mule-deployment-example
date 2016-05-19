echo "============== Provisioning =================="
D=$(date +"%m_%d_%Y")
mkdir logs
LOG=./logs/provision_$D.log
echo "============== Setting timezone =================="
sudo timedatectl set-timezone Australia/Brisbane
echo "============== OS Update =================="
sudo apt-get update
echo "============== Software Dependencies =================="
sudo apt-get install -y git=1:1.9.1-1ubuntu0.2
sudo apt-get install -y mercurial=2.8.2-1ubuntu1.3
echo "============== Mongodb =================="
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org=3.2.0
sudo sed -i 's/bind_ip = 127.0.0.1/#bind_ip  = 127.0.0.1/g' /etc/mongod.conf # Open network interface.
sudo service mongod restart
echo "============== Nodejs =================="
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash - 
sudo apt-get install -y nodejs
echo "============== Nodejs packages =================="
sudo npm install -g -y task-mule-cli
