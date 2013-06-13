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

Notice that you are automatically directed to the url http://localhost:1337/#/about this is AngularJS's routing taking over.

## Purpose

`The MEAN Stack` is designed to get you up and running with a modern web application very quickly. 

## Basic Structure
