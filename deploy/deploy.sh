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

help() {
	printf "$(basename $(realpath $0)) - Usage:
	--help 			Show this help text.
	--no-format		Omit the formatting stage.
	--no-minify		Omit the minification stage.\n"
}

argv=("$@")

if [[ "${argv[*]}" =~ "--help" ]]
then
	help
	exit
fi

source "$(dirname $(realpath $0))/common.sh"

deleteInstance() {
	if [ -d "$instanceFolder" ]
	then
		rm -rdf "$instanceFolder"
	fi
	if [[ "$1" != "--no-exit" ]]
	then
		exit
	fi
}

trap deleteInstance SIGINT
trap deleteInstance SIGTSTP

cd "$deployFolder"
git -C "$baseDirectory" pull

# Formatting; optional
if [[ ! "${argv[*]}" =~ "--no-format" ]]
then
	printf "Formatting source files.\n"
	"$deployFolder/format.sh" > /dev/null
fi

# Minification; optional
if [[ "${argv[*]}" =~ "--no-minify" ]]
then
	cd "$baseDirectory"
else
	# Create deployment instance folder
	deleteInstance --no-exit
	mkdir "$instanceFolder"

	# Fabricate "deployment environment"
	for i in $(find "$baseDirectory" -maxdepth 1 -type d ! -name ".*" ! -name "$instanceFolderName" ! -name "$deployFolderName" ! -name "$(basename $baseDirectory)")
	do
		basename="$(basename $i)"
		dirname="$instanceFolder/$basename"
		printf "Creating symlink for directory \'$(fileNameColorWrap $basename)\' (\'$(pathNameColorWrap $dirname)\').\n"
		ln -s "$i" "$dirname"
	done

	for i in $(find "$baseDirectory" -maxdepth 1 -type f -name "*.js" -o -name "*.html" ! -name "*.min.*") # Potentially CSS in the future; not using any right now
	do
		basename="$(basename $i)"
		filename="$instanceFolder/$basename"
		printf "Processing file \'$(fileNameColorWrap $basename)\'.\n"
		python3 "$deployFolder/min-names.py" "$i" > "$filename"
		if [[ $i == *html ]] # .min.html does not work
		then
			tmp=$(npx minify "$filename")
			echo $tmp > "$filename"
		else {
			npx minify "$filename" > "$instanceFolder/${basename%.*}.min.js"
			rm "$filename"
		}
		fi # minify will use the file ".minify.json" in the deploy folder for config
	done
	cd "$instanceFolder"
fi

printf "Running server.\n"
npx serve -p "$port" >> "$deployFolder/server-log.txt"
