#!/bin/bash

cd ~/game
git pull

deployFolder="deploy"
htmlMinifierArgs="--collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true"

if [ -d "./$deployFolder" ]
then
	rm -rdf ./$deployFolder
fi
mkdir ./$deployFolder

for i in $(find . -maxdepth 1 -type d ! -name ".*" ! -name "$deployFolder")
do
	name=$(basename $i)
	ln -s "$(pwd)/$name" "./$deployFolder/$name"
done

for i in $(find . -maxdepth 1 -type f -name "*.html")
do
    python3 ./min-names.py "$i" > "./$deployFolder/$i"
    npx html-minifier $htmlMinifierArgs "./$deployFolder/$i" >> "./deploy/$i"
done

for i in $(find . -maxdepth 1 -type f -name "*.js" ! -name "*.min.*")
do
	python3 ./min-names.py "$i" > "./$deployFolder/$i"
	npx minify "./$deployFolder/$i" > "./$deployFolder/${i%.*}.min.js"
	rm "./$deployFolder/$i"
done

printf "Running server."
cd ./$deployFolder
npx serve -p 6621 > /dev/null

#npx regex-replace '\w*(?<!\.min\.)js' 'min.js' ./main.js --filecontents 
