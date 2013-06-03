## Overview
This is the folder that all your SASS code should go into.

Everything should be imported into the main.scss file. The compass build step ensures that only the main.css file will be the output.

In the [environment.json](/environment.json) file, you can set the `cssCacheBusting`. This basically just adds a version number to the outputted css file. The version number used is taken from your `package.json` file. 

If you wish to turn off this cssCacheBusting feature you need to update the [index.tpl.html](public/index.tpl.html) file to look for the non-versioned css file.