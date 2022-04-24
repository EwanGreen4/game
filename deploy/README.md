### Deployment scripts for [game]
These scripts are completely optional. The game can be tested on its own via. conventional webpage testing methods (opening index.html in a browser & letting it all happen from there). However, since we plan to provide a more centralized version of the game for people to actually play, deployment scripts are necessary.

`deploy.sh` is the deployment script. Given all the dependencies are installed, that's all you have to do.

`format.sh` can be used for formatting the files without deploying.

What it does:
- Formats all existing .js and .html files for no reason other than cleanliness
- Creates a deployment environment separate from that of the source
  - Symlinks all non-meta directories of the parent
  - Minifies all .js & .html files (.js -> .min.js)
  - Replaces all instances of ".js" with ".min.js" between keywords MIN-START and MIN-END; applies to .html and .js 

Dependencies:
- Python (3+? Not sure)
- Node.js and NPM, with the following packages
  - `minify`
  - `prettier`
  - `serve`
