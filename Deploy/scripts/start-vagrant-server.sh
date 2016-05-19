echo ===== Starting Server =====

echo === Installing npm deps ===
cd ~/deployment
npm install -y --no-bin-links

echo === Starting server ===
task-mule schedule > /var/log/scheduled-job.log

echo ===== Server Started =====
