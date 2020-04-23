#!/bin/bash -x
podOutput=$(podman pod ls | grep podsso)

if [[ $podOutput =~ podsso(.*)[[:space:]]([0-9A-Za-z]+)$ ]]
then
	containerId=${BASH_REMATCH[2]}
	ipOutput=$(podman inspect $containerId | grep -i ipaddress)
	
else
	echo "podsso not found"
	exit -1
fi

if [[ $ipOutput =~ (.+)\"(.+)\", ]]
then
	ipAddress=${BASH_REMATCH[2]}
else
	echo "ip not found"
	exit -1
fi


podman pod create --name podadminer -p 127.0.0.1:8081:8080 --hostname podadminer --add-host sso.ias.gov.mo:$ipAddress
podman run --pod podadminer --name containeradminer -d adminer:latest
