#!/bin/bash

cd ~/game
git pull
for i in $(find . -type f -name "*.js" ! -name "*.min.*")
do
	npx minify "$i" > "${i%.*}.min.js"
done
printf "Running server."
npx serve -p 6621 > /dev/null
