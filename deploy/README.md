### Deployment scripts for [game]
These scripts are completely optional. The game can be tested on its own via. conventional webpage testing methods (opening index.html in a browser & letting it all happen from there), given CORS policies are allowed. However, since we plan to provide a centralized version of the game for people to actually play, deployment scripts are necessary. This will also be needed if your browser doesn't support CORS requests via. file://.

What it does:
- Formats all existing .js and .html files for no reason other than cleanliness
- Creates a deployment environment separate from that of the source
  - Symlinks all non-meta directories of the parent
  - Minifies all .js & .html files (.js -> .min.js)
  - Replaces all instances of ".js" with ".min.js" between keywords MIN-START and MIN-END; applies to .html and .js 

How to use it:

  `deploy.sh` is the deployment script. Given all the dependencies are installed, that's all you have to do. `--no-format` omits the formatting stage and `--no-minify` omits the minification stage, in which case it will just deploy the source folder instead of making a new environment (no changes are needed). Port must be specified in `common.sh`. We have it set to 6621.

`format.sh` can be used for formatting the files without deploying.

Dependencies:
- Python (3+? Not sure)
- Node.js and NPM, with the following packages
  - `minify`
  - `prettier`
  - `serve`
