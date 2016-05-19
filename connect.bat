@echo off
setlocal
if "%1" == "" set sshhost=scheduled-job
if not "%1" == "" set sshhost=%1
ssh scheduled-job@%sshhost%.cloudapp.net -i .\keys\your-private.key -o "StrictHostKeyChecking no" -C 
