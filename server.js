var app,
	app_root	= __dirname,
	app_port	= process.env.PORT || 1337,
	env	= require('./environment.json').environment,
	dbConfig = require('./db/config.js')[env],
	fs			= require('fs'),
	express		= require('express'),
	util		= require('util'),
	mongoose	= require('mongoose'),
	logging		= require('node-logging');
	// nib			= require('nib'),
	// passport	= require('passport');

// Connect to the Mongo db
mongoose.connect(dbConfig.db);
mongoose.connection.once('open', function () {
	console.log('Connected successfully....');
});

// Initial bootstrapping
exports.boot = function(params){
	
	//Create our express instance
	app = express();	
	
	// Bootstrap application
	bootApplication(app);
	
	bootModels(app);
	//bootControllers(app);
	
	return app;
};

function bootApplication(app) {
	// Config
	app.engine('html', require('ejs').renderFile);

	// Middleware
	app.use(express.bodyParser());
	app.use(express.compress());
	app.use(express.methodOverride());
	app.use(express.cookieParser());

	// Serve static files from the /public directory
	app.use(express.static(app_root + '/public'));
	
	// Set up an expressJs session
	app.use(express.session({
		secret: "SUPERimportantSTRING CHANGE IT",
		maxAge: new Date(Date.now() + 3600000)
  }));

	//app.use(passport.initialize());
	//app.use(passport.session());

	// Moves our routes above the Middleware
	// so this will attempt to match our route before continueing
	app.use(app.router);

	// Set up logging here so you dont get a log for every static file
	app.use(express.logger());
	app.use(logging.requestLogger);

	app.get('/', function (req, res)
	{
		res.render('index.html');
	});

	
}

//Bootstrap models 
function bootModels(app) {
	fs.readdir(app_root + '/db/models', function (err, files) {
		if (err) {
			throw err;
		}

		files.forEach(function (file) {
			bootModel(app, file);
		});
	});
	
}

// Bootstrap controllers
function bootControllers(app) {
	fs.readdir(app_root + '/db/controllers', function(err, files){
		if (err) throw err;
		files.forEach(function(file){			
			bootController(app, file);				
		});
	});
	
	require(app_root + '/db/controllers/AppController')(app);			// Include
}

function bootModel(app, file) {
	var name = file.replace('.js', ''),
		schema = require(app_root + '/db/models/'+ name);				// Include the mongoose file
}

// Load the controller, link to its view file from here
function bootController(app, file) {
	var name = file.replace('.js', ''),
		controller = app_root + '/controllers/' + name,	 // full controller to include
		template = name.replace('Controller','').toLowerCase();	// template folder for html - remove the ...Controller part.

	// console.log('bootController')
	// console.log('name = '+name)
	// console.log('controller = '+controller)
	// console.log('template = '+template)
	
	// Include the controller
	//require(controller)(app,template);			// Include
}

// allow normal node loading if appropriate
if (!module.parent) {
	exports.boot().listen(app_port);
	console.log("Express server %s listening on port %d", express.version, app_port);
}