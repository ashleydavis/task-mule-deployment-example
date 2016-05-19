echo ===== Starting Server =====
sudo stop scheduled-job

echo === Installing npm deps ===
cd ~/deployment && npm install -y --no-bin-links

echo === Starting server ===
sudo start scheduled-job

# For errors
# sudo cat /var/log/upstart/scheduled-job.log

echo ===== Server Started =====
