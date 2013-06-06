module.exports = function (grunt) {
	
	/**
	 *	Load the required Grunt tasks. These are installed based on the version listed in
	 *	'package.json' file when you do 'npm install'.
	 */
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-ngmin');

	/**
	 *	Load any external Grunt tasks
	 *	Ref: http://gruntjs.com/api/grunt.task#grunt.task.loadtasks
	 */
	grunt.loadTasks('grunt-tasks');

	/**
	 *	Grunt's configuration object basically tells Grunt what to do
	 */
	grunt.initConfig({
		// Read in the package.json file to get config naming items
		pkg: grunt.file.readJSON('package.json'),
		env: grunt.file.readJSON('environment.json'),

		mindir: 'public/min',

		/**
		 * The banner is the comment that is placed at the top of our compiled 
		 * source files. It is first processed as a Grunt template, where the `<%=`
		 * pairs are evaluated based on this very configuration object.
		 */
		meta: {
			banner: 
				'/**\n' +
				' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * <%= pkg.homepage %>\n' +
				' *\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
				' */\n'
		},

		/**
		 * This is a collection of file definitions we use in the configuration of
		 * build tasks. 
		 *		`js` is all project javascript, less tests, library files and min'd files
		 *		`atpl` contains our reusable components' template HTML files
		 *		`ctpl` contains the same, but for our app's code
		 *		`html` is just our main HTML file
		 *		'sass' is out main sass file (the one that includes all other scss files)
		 */
		src: {
			js: [ 'public/**/*.js', '!public/**/*.spec.js', '!public/min/**' ],
			atpl: [ 'public/app/**/*.tpl.html' ],
			ctpl: [ 'public/components/**/*.tpl.html' ],
			tpljs: [ 'public/min/tmp/**/*.js' ],
			itpl: [ 'public/index.tpl.html' ],
			sass: ['public/sass/**/*.scss'],
			unit: [ 'public/**/*.spec.js' ]
		},

		/**
		 *	The directory to clean when 'grunt clean' is executed
		 */
		clean: [ '<%= mindir %>/*.js'],

		/**
		 *	Use ngmin to annotate the angular sources prior to minifying
		 */
		ngmin: {
			dist: {
				src: ['<%= mindir %>/<%= pkg.name %>.concat.app.js'],
				dest: '<%= mindir %>/<%= pkg.name %>.annotated.js'
			}
		},

		/**
		 *	This task will copy the main.css file to the same folder
		 *	but will include a version number from the package.json file
		 */
		copy: {
			css: {
				files: [{ 
					src: [ 'public/stylesheets/main.css' ],
					dest: 'public/stylesheets/main.v<%= pkg.version %>.css',
					expand: false
				}]
			}
		},

		concat: {
			app: {
				src: [
					'module.prefix',
					'<%= src.js %>',
					'<%= src.tpljs %>',
					'module.suffix'
				],
				dest: '<%= mindir %>/<%= pkg.name %>.concat.app.js'
			},

			libs: {
				src: [
					'<%= env.libFiles %>',
					'<%= mindir %>/<%= pkg.name %>.annotated.js'	
				],
				dest: '<%= mindir %>/<%= pkg.name %>.concat.full.js'
			}
		},

		/**
		 *	This is the compass task. 
		 *	The 'dist' obj min's the scss files
		 *	The 'dev' obj just does a regular compass compile
		 */
		compass: {
			dist: {
				options: {
					basePath: 'public/',
					sassDir: 'sass',
					cssDir: 'stylesheets/',
					environment: 'production',
					raw: "preferred_syntax = :scss\n",
					specify: 'public/sass/main.scss'
				}
			},

			dev: {
				options: {
					basePath: 'public/',
					outputStyle: 'expanded',
					sassDir: 'sass',
					cssDir: 'stylesheets/',
					environment: 'development',
					raw: "preferred_syntax = :scss\n",
					specify: 'public/sass/main.scss'
				}
			}
		},

		/**
		 *	'jshint' defines the rules that our linter will use.
		 *	Exclude the components directory
		 */
		jshint: {
			src: [ 
				'Gruntfile.js', 
				'<%= src.js %>',
				'<%= src.unit %>',
				'!public/components/**'
			],
			test: [
				'<%= src.unit %>'
			],
			gruntfile: [
				'Gruntfile.js'
			],
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true
			},
			globals: {}
		},

		/**
		 * HTML2JS is a Grunt plugin originally written by the AngularUI Booststrap
		 * team and updated to Grunt 0.4 by Josh Miller. It takes all of your template files
		 * and places them into JavaScript files as strings that are added to 
		 * AngularJS's template cache. This means that the templates too become part
		 * of the initial payload as one JavaScript file.
		 */
		html2js: {
			/**
			 * These are the templates from `public/app`.
			 */
			app: {
				src: [ '<%= src.atpl %>' ],
				base: 'public/app',
				dest: '<%= mindir %>/tmp'
			},

			/**
			 * These are the templates from `public/components`.
			 */
			component: {
				src: [ '<%= src.ctpl %>' ],
				base: 'public/components',
				dest: '<%= mindir %>/tmp'
			}
		},

		/**
		 * Minify the sources!
		 */
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			
			dist: {
				files: {
					'<%= mindir %>/<%= pkg.name %>.min.v<%= pkg.version %>.js': [ '<%= mindir %>/<%= pkg.name %>.concat.full.js' ]
				}
			}
		},

		/**
		* Jasmine unit testing
		*/
		jasmine: {
			src: '<%= src.js %>',
			options: {	
				specs: '<%= src.unit %>',
				vendor: ['<%= env.libFiles %>', '<%= env.testingLibs %>'],
				helpers: '<%= src.tpljs %>'
			}
		},

		/**
		 *	
		 */
		delta: {
			/**
			 * By default, we want the Live Reload to work for all tasks; this is
			 * overridden in some tasks (like this file) where browser resources are
			 * unaffected. It runs by default on port 35729.
			 */
			options: {
				livereload: false
			},

			/**
			 * When the Gruntfile changes, we just want to lint it. That said, the
			 * watch will have to be restarted if it should take advantage of any of
			 * the changes.
			 */
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: [ 'jshint:gruntfile' ],
				options: {
					livereload: false
				}
			},

			/**
			 * When our source files or unit tests change, we want to run most of our build tasks
			 * (excepting uglification).
			 */
			src: {
				files: [ 
					'<%= src.js %>',
					'<%= src.unit %>'
				],
				tasks: [ 'jshint:src', 'concat:app', 'ngmin:dist', 'concat:libs', 'uglify', 'jasmine' ]
			},

			/**
			 * When the CSS files change, we need to compile and minify just them.
			 */
			sass: {
				files: [ 'public/sass/**/*.scss' ],
				tasks: 'compassCompile'
			},

			index: {
				files: [ '<%= src.itpl %>' ],
				tasks: [ 'index' ]
			},

			/**
			 * When our templates change, we only add them to the template cache.
			 */
			tpls: {
				files: [ 
					'<%= src.atpl %>', 
					'<%= src.ctpl %>'
				],
				tasks: [ 'html2js', 'concat:app', 'ngmin:dist', 'concat:libs', 'uglify' ]
			},

			vendor: {
				files: 'vendor/**',

				tasks: [ 'concat:app', 'ngmin:dist', 'concat:libs', 'uglify' ]
			},

			envs: {
				files: 'environment.json',
				tasks: ['clean', 'compassCompile', 'index']
			}
		}
	});

	/**
	 * Grunt Tasks
	 */

	/**
	 *	This allows us to watch what we want to watch and control what happens
	 */
	grunt.renameTask('watch', 'delta');
	grunt.registerTask('watch', ['default', 'jasmine', 'delta']);

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean', 'html2js', 'jshint', 'concat:app', 'ngmin:dist', 'concat:libs', 'uglify', 'compassCompile', 'index', 'jasmine']);

	grunt.registerTask('test', ['jasmine']);

	/**
	 *  Task for general compass items 
	 *  This task will determine which environment you have set and run that task
	 */
	grunt.registerTask('compassCompile', 'Compiling the sass files', function () {
		var env = grunt.config.get("env");

		grunt.log.writeln("Current environment: " + env.environment);

		if (env.environment === "production") {
			grunt.task.run('compass:dist');
		} else {
			grunt.task.run('compass:dev');
		}

		// If youd like the file with v0.0.1.css for cacheBusting
		if (env.cssCacheBusting) {
			grunt.task.run('copy:css');	
		}

	});

	/** 
	 * The index.html template includes the stylesheet and javascript sources
	 * based on dynamic names calculated in this Gruntfile. This task compiles it.
	 */
	grunt.registerTask( 'index', 'Process index.html template', function () {
		grunt.log.writeln("Converting index.html...");

		grunt.file.copy('public/index.tpl.html', 'public/index.html', { process: grunt.template.process });
	});
};