#!/bin/bash

cd ~/game
git pull

regex="MIN-START(.*)MIN-END"
regex2="\w*(?<!\.min\.)js"

for i in $(find . -type f -name "*.js" ! -name "*.min.*")
do
    if [[ $(cat "$i") =~ $regex ]]
    then
        name="${BASH_REMATCH[1]}"
		echo $name
        while [[ "$name" =~ $regex2 ]];
			do
				npx regex-replace "$name" "" "$i"
			keww="${BASH_REMATCH[1]}"
			echo $keww
			done
    fi
	npx minify "$i" > "${i%.*}.min.js"
	
done
printf "Running server."
npx serve -p 6621 > /dev/null

#npx regex-replace '\w*(?<!\.min\.)js' 'min.js' ./main.js --filecontents 
