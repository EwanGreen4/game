import re
import sys

delim = "ඞඞඞ"

with open(sys.argv[1], "r") as f:
    data = f.read().replace('\n', delim)
    
x = re.findall("MIN-START(.*?)MIN-END", data) # Must use non-greedy matching or it will match all between first MIN-START and last MIN-END (bad)

if x is not None:
    
    for i in x:
        preStr = i

        postStr = re.sub(r'\w*(?<!\.min\.)js', 'min.js', preStr)
        postStr = postStr.replace(delim, '\n')

        data = data.replace(preStr, postStr)

data = data.replace(delim, '\n')

print(data)
