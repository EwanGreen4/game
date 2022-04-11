#!/bin/bash

cd ~/game
git pull
printf "Running server."
npx serve -p 6621 > /dev/null
