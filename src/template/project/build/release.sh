#!/usr/bin/env bash

## config
basepath=$(cd `dirname $0`; pwd)
dir=$basepath

lgstatic=10.1.200.25

receiver1=10.1.200.80	#66环境
receiver2=10.1.200.54    #55环境
receiver3=10.1.200.79   #79环境
receiver4=10.1.201.143   #A环境

if [ $1 == 143 ];then
receiver=$receiver4
elif [ $1 == 79 ];then
receiver=$receiver3
elif [ $1 == 54 ];then
receiver=$receiver2
else
receiver=$receiver1
fi



tar -czf releaseMdsPiplineFed.static.tar.gz ./static
tar -czf releaseMdsPiplineFed.template.tar.gz ./template
#scp releaseMdsPiplineFed.template.tar.gz root@${receiver}:/data/apps/mds-web-tomcat/webapps/ROOT&& ssh root@${receiver} "cd /data/apps/mds-web-tomcat/webapps/ROOT && tar xmzvf releaseMdsPiplineFed.template.tar.gz && exit"
#
#scp releaseMdsPiplineFed.static.tar.gz root@${lgstatic}:/data/static/pipline&& ssh root@${lgstatic} "cd /data/static/pipline && tar xmzvf releaseMdsPiplineFed.static.tar.gz"
#
#rm -rf static template releaseMdsPiplineFed.static.tar.gz releaseMdsPiplineFed.template.tar.gz
