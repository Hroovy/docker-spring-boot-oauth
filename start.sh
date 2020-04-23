#!/bin/bash -x
podman pod create --name podsso -p 8080:8080 --hostname podsso
podman run --pod podsso --name ssodb -v ./mariadb/data:/var/lib/mysql -v ./mariadb/conf.d:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=y8VSMRL62tAsgXKu -d mariadb:10.4 
podman run --pod podsso --name ssotomcat -v /root/container/sso:/root/external -v /root/container/sso/tomcat/webapps:/usr/local/tomcat/webapps -d localhost:5000/tomcat9.0:latest
