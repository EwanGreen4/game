#!/bin/bash

cd ~/game
git pull

deployFolder="deploy"

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

for i in $(find . -maxdepth 1 -type f -name "*.js" -o -name "*.html" ! -name "*.min.*")
do
	python3 ./min-names.py "$i" > "./$deployFolder/$i"
	if [[ $i == *html ]] # .min.html does not work
	then
		npx minify "./$deployFolder/$i" >> "./$deployFolder/$i"
	else {
		npx minify "./$deployFolder/$i" > "./$deployFolder/${i%.*}.min.js"
		rm "./$deployFolder/$i"
	}
	fi
done

printf "Running server."
cd ./$deployFolder
npx serve -p 6621 > /dev/null
