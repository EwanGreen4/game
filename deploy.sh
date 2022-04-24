#!/bin/bash

cd ~/game
git pull

deployFolder="instance"

if [ -d "./$deployFolder" ]
then
	rm -rdf ./$deployFolder
fi
mkdir ./$deployFolder

for i in $(find . -maxdepth 1 -type d ! -name ".*" ! -name "$deployFolder" ! -name "deploy")
do
	name=$(basename $i)
	ln -s "$(pwd)/$name" "./$deployFolder/$name"
done

for i in $(find . -maxdepth 1 -type f -name "*.js" -o -name "*.html" ! -name "*.min.*")
do
	python3 "./deploy/min-names.py" "$i" > "./$deployFolder/$i"
	if [[ $i == *html ]] # .min.html does not work
	then
		tmp=$(npx minify "./$deployFolder/$i")
		echo $tmp > "./$deployFolder/$i"
	else {
		npx minify "./$deployFolder/$i" > "./$deployFolder/${i%.*}.min.js"
		rm "./$deployFolder/$i"
	}
	fi
done

printf "Running server."
cd ./$deployFolder
npx serve -p 6621 > /dev/null
