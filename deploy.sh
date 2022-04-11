#!/bin/bash

cd ~/game
git pull

declare -i count=0
while [[ $(pgrep -f ${0##*/}|wc -l) -gt 1 ]]; do
   ((++count))
   if [[ $count -gt 10 ]]; then
      echo "ERROR: can't kill pids" >&2
      exit 1
   fi
done

local mypid=$$    # capture this run's pid

declare pids=($(pgrep -f ${0##*/}   # get all the pids running this script

for pid in ${pids[@]/$mypid/}; do   # cycle through all pids except this one
	kill $pid                        # kill the other pids
	sleep 1                          # give time to complete
done

nohup npx serve -p 6621 &

