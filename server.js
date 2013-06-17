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

// Connect to the Mongo db
mongoose.connect(dbConfig.db);
mongoose.connection.once('open', function () {
	console.log('Connected successfully....');
});

mongoose.connection.once('error', function () {
	console.error('MONGO SERVER NOT STARTED!');
});

// Initial bootstrapping
exports.boot = function(params){
	
	//Create our express instance
	app = express();	
	
	// Bootstrap application
	bootApplication(app);
	
	bootModels();
	bootControllers();
	
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
	app.use('/', express.static(app_root + '/public'));
	
	// Set up an expressJs session
	app.use(express.session({
		secret: "SUPERimportantSTRING CHANGE IT",
		maxAge: new Date(Date.now() + 3600000)
  }));

	// Moves our routes above the Middleware
	// so this will attempt to match our route before continueing
	app.use(app.router);

	// Set up logging here so you dont get a log for every static file
	app.use(express.logger());
	app.use(logging.requestLogger);
}

//Bootstrap models 
function bootModels() {
	fs.readdir(app_root + '/db/models', function (err, files) {
		if (err) {
			throw err;
		}

		files.forEach(function (file) {
			bootModel(file);
		});
	});
	
}

// Bootstrap controllers
function bootControllers() {
	fs.readdir(app_root + '/db/controllers', function(err, files){
		if (err) {
			throw err;
		}

		files.forEach(function(file){			
			bootController(file);				
		});
	});
	
	// Include the main Controller
	require(app_root + '/db/controllers/AppController')(app);
}

function bootModel(file) {
	var name = file.replace('.js', '');

	// Include the mongoose file
	require(app_root + '/db/models/'+ name);
}

// Load the controller, link to its view file from here
function bootController(file) {
	var name = file.replace('.js', ''),
			controller = app_root + '/db/controllers/' + name;

	// Include the controller
	require(controller);
}

// allow normal node loading if appropriate
if (!module.parent) {
	exports.boot().listen(app_port);
	console.log("Express server listening on port %d", app_port);
}