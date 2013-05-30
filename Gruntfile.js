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

	//grunt.loadNpmTasks('grunt-karma');
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
      js: [ 'public/**/*.js', '!public/**/*.spec.js', '!public/libs/*.js', '!public/min' ],
      libs: ['public/libs/*.js'],
      atpl: [ 'public/app/**/*.tpl.html' ],
      ctpl: [ 'public/components/**/*.tpl.html' ],
      //tpljs: [ '<%= distdir %>/tmp/**/*.js' ],
      html: [ 'public/index.html' ],
      sass: 'public/sass/main.scss',
      unit: [ 'public/**/*.spec.js' ]
    },

    /**
     *	The directory to clean when 'grunt clean' is executed
     */
    clean: [ '<%= mindir %>'],

    /**
     *	Use ngmin to annotate the angular sources prior to minifying
     */
    ngmin: {
    	dist: {
    		src: [],
    		dest: ''
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
          sassDir: 'public/sass',
          cssDir: 'public/styles/',
          environment: 'production',
          raw: "preferred_syntax = :scss\n"
        }
      },

      dev: {
        options: {
          outputStyle: 'compact',
          sassDir: 'public/sass',
          cssDir: 'public/styles/',
          environment: 'development',
          raw: "preferred_syntax = :scss\n"
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
     *	
     */
    delta: {
    	/**
       * By default, we want the Live Reload to work for all tasks; this is
       * overridden in some tasks (like this file) where browser resources are
       * unaffected. It runs by default on port 35729.
       */
      options: {
        livereload: true
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
       * When our source files change, we want to run most of our build tasks
       * (excepting uglification).
       */
      src: {
        files: [ 
          '<%= src.js %>'
        ],
        tasks: [ 'jshint:src', 'concat:dist', 'ngmin:dist', 'uglify:dist' ]
      },

      /**
       * When the CSS files change, we need to compile and minify just them.
       */
      sass: {
        files: [ 'src/**/*.scss' ],
        tasks: 'compassCompile'
      },

      envs: {
        files: [
          'environment.json'
        ],

        tasks: ['build']
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
	//grunt.registerTask('watch', ['default', 'karma:unit', 'delta']);
	grunt.registerTask('watch', ['default', 'delta']);

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean', 'jshint', 'concat', 'ngmin:dist', 'uglify', 'compassCompile']);

	/**
   *  Task for general compass items 
   *  This task will determine which environment you have set and run that task
   */
  grunt.registerTask('compassCompile', 'Compiling the sass files', function () {
    grunt.log.writeln("Current environment: " + grunt.config.get("env").environment);

    if (grunt.config.get("env").environment === "production") {
      grunt.task.run('compass:dist');
    } else {
      grunt.task.run('compass:dev');
    }
    
  });
};