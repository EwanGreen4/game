#!/usr/bin/env bash

# format.sh - Ewan Green

# Script for formatting source files.

source "$(dirname $(realpath $0))/common.sh"

for i in $(find "$baseDirectory" -maxdepth 1 -type f -name "*.js" -o -name "*.html" ! -name "*.min.*") # Potentially CSS in the future; not using any right now
do
	basename="$(basename $i)"
	filename="$instanceFolder/$basename"
	printf "Formatting file \'$(fileNameColorWrap $basename)\'.\n"
	npx prettier --config "$deployFolder/.prettier.json" --write "$i" > /dev/null
done
