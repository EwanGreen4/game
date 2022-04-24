#!/usr/bin/env bash

# common.sh - Ewan Green

# Common definitions for deployment.

fileNameColorWrap() {
	echo "\e[34m$1\e[0m"
}

pathNameColorWrap() { 
	echo "\e[33m$1\e[0m"
}

baseDirectory="$HOME/game"
deployFolderName="deploy"
deployFolder="$baseDirectory/$deployFolderName"
instanceFolderName="instance"
instanceFolder="$baseDirectory/$instanceFolderName"
