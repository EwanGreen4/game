#!/bin/bash
cd ~/game
git pull
pkill `basename "$0"`
nohup npx serve -p 6621 &

