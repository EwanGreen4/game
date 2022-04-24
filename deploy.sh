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


baseDirectory="$(pwd)"
deployFolderName="deploy"
deployFolder="$baseDirectory/$deployFolderName"
instanceFolderName="instance"
instanceFolder="$baseDirectory/$instanceFolderName"

cd "$deployFolder"

git -C "$baseDirectory" pull
if [ -d "$instanceFolder" ]
then
	rm -rdf "$instanceFolder"
fi
mkdir "$instanceFolder"

for i in $(find "$baseDirectory" -maxdepth 1 -type d ! -name ".*" ! -name "$instanceFolderName" ! -name "$deployFolderName" ! -name "$(basename $baseDirectory)")
do
	name="$(basename $i)"
	printf "Creating symlink for directory \'\e[34m$(basename $i)\e[0m\' (\'\e[34m$instanceFolder/$(basename $i)\e[0m\').\n"
	ln -s "$i" "$instanceFolder/$name"
done

for i in $(find "$baseDirectory" -maxdepth 1 -type f -name "*.js" -o -name "*.html" ! -name "*.min.*")
do
	basename="$(basename $i)"
	printf "Processing file \'\e[34m$basename\e[0m\'.\n"
	npx prettier --write "$i" > /dev/null
	python3 "$deployFolder/min-names.py" "$i" > "$instanceFolder/$basename"
	if [[ $i == *html ]] # .min.html does not work
	then
		tmp=$(npx minify "$instanceFolder/$basename")
		echo $tmp > "$instanceFolder/$basename"
	else {
		npx minify "$instanceFolder/$basename" > "$instanceFolder/${basename%.*}.min.js"
		rm "$instanceFolder/$basename"
	}
	fi
done

printf "Running server.\n"
cd $instanceFolder
npx serve -p 6621 > /dev/null
