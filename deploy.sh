#!/usr/bin/env bash

# deploy.sh - Ewan Green

# Script for deploying the game as a static webpage. Makes no alterations to
# the existing code (except for formatting it). It can be tested locally 
# (within browser with non-minified, original versions) as well as "deployed".

# This script will do the following:
#		- Format source files
#		- Create an instance folder with minified versions of the code
#		- Make edits accordingly (.js to .min.js, symlinks to emulate directory structure)
#		- Statically host the instance via. serve

cd ~/game
git pull

deployFolderName="instance"
deployFolder="$(pwd)/$deployFolderName"

if [ -d "$deployFolder" ]
then
	rm -rdf "$deployFolder"
fi
mkdir "$deployFolder"

for i in $(find . -maxdepth 1 -type d ! -name ".*" ! -name "$deployFolderName" ! -name "deploy")
do
	name=$(basename $i)
	printf "Creating symlink for directory \'\e[34m$(basename $i)\e[0m\' (\'\e[34m$deployFolder/$(basename $i)\e[0m\').\n"
	ln -s "$(pwd)/$name" "$deployFolder/$name"
done

for i in $(find . -maxdepth 1 -type f -name "*.js" -o -name "*.html" ! -name "*.min.*")
do
	printf "Processing file \'\e[34m$(basename $i)\e[0m\'.\n"
	npx prettier --write "$i" > /dev/null
	python3 "./deploy/min-names.py" "$i" > "$deployFolder/$i"
	if [[ $i == *html ]] # .min.html does not work
	then
		tmp=$(npx minify "$deployFolder/$i")
		echo $tmp > "$deployFolder/$i"
	else {
		npx minify "$deployFolder/$i" > "$deployFolder/${i%.*}.min.js"
		rm "$deployFolder/$i"
	}
	fi
done

printf "Running server.\n"
cd $deployFolder
npx serve -p 6621 > /dev/null
