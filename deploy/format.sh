#!/usr/bin/env bash

# format.sh - Ewan Green

# Script for formatting source files.

source "$(dirname $(realpath $0))/common.sh"

cd "$deployFolder"
for i in $(find "$baseDirectory" -maxdepth 1 -type f -name "*.js" -o -name "*.html" -o -name "*.css" ! -name "*.min.*")
do
	printf "Formatting file \'$(fileNameColorWrap $(basename $i))\'.\n"
	npx prettier --config "$deployFolder/.prettier.json" --write "$i" > /dev/null
done
