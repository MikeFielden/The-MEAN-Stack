Welcome to the MEAN Stack boilerplate.

This is a SPA (single page application) boilerplate using the following technologies:

###  Technologies
- [MongoDb](http://www.mongodb.org/)
	- [MongooseJs](http://mongoosejs.com/)
- [ExpressJs](http://expressjs.com/)
- [AngularJs](http://angularjs.org/)
- [GruntJs](http://gruntjs.com/)
- [Bower](http://bower.io/)
- [Sass (Compass)](http://compass-style.org/)
- [Foundation](http://foundation.zurb.com/)
- [Foundation Icons](http://zurb.com/playground/foundation-icons)

## Quick Start
Install the following on your own
- [NodeJs](http://nodejs.org/)
- [Compass](http://compass-style.org/install/)
	
	```sh
  $ gem update --system
  $ gem install compass
  ```
- [MongoDb](http://www.mongodb.org/downloads)

```sh
$ git clone git@github.com:MikeFielden/The-MEAN-Stack.git
$ cd The-MEAN-Stack
$ sudo npm -g install grunt-cli bower
$ npm install
$ bower install
.
.
update the package.json file
.
$ grunt
```

At this point all your client-side code should be watching for changes.

If you have [Supervisor](https://github.com/isaacs/node-supervisor) installed...
`supervisor server` 

Supervisor will watch all of your server-side js and automatically restart your server everytime it detects a change.

If not 

`node server`

You can now navigate to [http://localhost:1337](http://localhost:1337)

Notice that you are automatically directed to the url [http://localhost:1337/#/about](http://localhost:1337/#/about) this is AngularJS's routing taking over.

### Purpose

`The MEAN Stack` is designed to get you up and running with a modern web application very quickly. 

### The Build System

The best way to learn about the build system is by familiarizing yourself with
Grunt and then reading through the heavily documented build script,
`Gruntfile.js`.

The driver of the process is the `delta` multi-task, which watches for file
changes using `grunt-contrib-watch`. What follows is a list of the tasks you can run out of the box.

* `grunt` - This is the main task.
	- Cleans out the `min/` folder
	- JSHint
	-	Concats the js into the correct order
	- Minify concat'd js from above (using uglify)
	- Compiles the sass
	- Compiles the index page (mostly for caching busting)
	- Executes tests (using Jasmine)
* `grunt build` - Same as the `grunt` task
* `grunt watch` - Same as the `grunt` task plus watches files
* `grunt test` - Executes the jasmine tests
* `grunt compassCompile` - Uses the `environment.json` file to determine whether or not to minify the css output and whether or not to attach a version number to the outputted file.
* `grunt index` - Compiles the index file. We do this because I want to tie into some variables located in the `package.json` file.

### Philosophy
#### Client-side JS ####

As it stands now; the output of the javascript build process is a minified versioned single javascript file. During the build process many files are created for your use during development.  These files can be found in the `min/` folder.

The format for the file names are:
- `NAMEOFAPP.annotated.js` - The output of the `ngmin` task that makes ready angularJS files
- `NAMEOFAPP.concat.app.js` - The output of the `prefix` + `js` + `ClientSideTemplates` + `suffix`
- `NAMEOFAPP.concat.full.js` - The output of the lib files placed in the `environment.json` file + `NAMEOFAPP.concat.app.js`
- `NAMEOFAPP.min.vVERSION.js` - The minified `NAMEOFAPP.concat.full.js`

#### Sass ####
We use [Compass](http://compass-style.org/) because it comes with a lot of built in extensions and niceties.

We also decided to go against the current trend of Twitter's Bootstrap because it seems like every new site made today is using that. So, to change it up we decided to go with [Foundation](http://foundation.zurb.com/) and their [Foundation Icons](http://zurb.com/playground/foundation-icons).

Lastly, we feel there should only be 1 output from the Sass compilation process. `main.scss` is the file that includes all other files.

#### MongoDB ####
Under the `db/` directory, you will find two sub directories: `controllers`, `models`

These are added and required automatically from running `node server`.
If you look into the `AppController.js` file you will see that most of the standard routes are defined for you and are routed to the specific controller based on the `urlPath` and the http verb.


## FAQ
1. What is this `environment.json` file used for?
This file is used to control certain aspects of the build process. 

* `environment` - Tells the SASS compilation whether or not to minify and compress the output. 
	- `development` -> Expanded output
	- `production` -> Compressed/Minified output
* `cssCacheBusting` - Tells the grunt task whether or not to make a copy of the file using the version number in the `package.json` file
* `libFiles` - Files you want included in the concatentation build process.
	- It's worth noting here that order does matter in this array
* `testingLibs` - Files required for testing but do not need to be part of your file outputted css
