#!/usr/bin/env python

# min-names.py - Ewan Green

# This script will use regular expressions to find instances of .js that we
# want to replace with .min.js. The only time we would want to do that is
# between keywords "MIN-START" and "MIN-END", so as to not mess with external
# .js files like those included as a library otherwise not minified.

import re
import sys

if len(sys.argv) > 1:
    delim = "ඞඞඞ"  # eh
    with open(sys.argv[1], "r") as f:
        data = f.read().replace('\n', delim)
        
    x = re.findall("MIN-START(.*?)MIN-END", data) # Must use non-greedy matching or it will match all between first MIN-START and last MIN-END (bad)
    if x != None:
        for i in x:
            postStr = re.sub(r'\w*(?<!\.min\.)js', 'min.js', i).replace(delim, '\n')
            data = data.replace(i, postStr)
    
    data = data.replace(delim, '\n')
    print(data)
    
else:
    sys.exit('You must provide a file.')
