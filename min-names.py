import re
import sys

delim = "ඞඞඞ"

with open(sys.argv[1], "r") as f:
    data = f.read().replace('\n', delim)
    
x = re.search("MIN-START(.*)MIN-END", data)

if x is not None:

    preStr = x.group()

    postStr = re.sub(r'\w*(?<!\.min\.)js', 'min.js', preStr)
    postStr = postStr.replace(delim, '\n')

    data = data.replace(preStr, postStr)

data = data.replace(delim, '\n')

print(data)
