var inflection = require('inflection');

module.exports = function (app) {
	// Below is required if you delete the favicon.ico from public
	// app.get("/favicon.ico", function() {});

	/*
	 *	Plural calls
	 */
	// GET '/cats'
	app.get("/:controller?", router);

	/*
	 *	Plural Create & Delete
	 */
	// POST '/cats'
	app.post('/:controller', router);

	// DELETE '/cats'
	app.del('/:controller', router);

	/*
	 *	Singular calls
	 */
	// GET '/cat/1'
	app.get("/:controller/:id", router);

	// UPDATE '/cat/1'
	app.put('/:controller/:id', router);

	// DELETE '/cat/1'
	app.del('/:controller/:id', router);
};

function router (req, res, next) {
	var controller = req.params.controller ? req.params.controller : '',
			controllerName,
			controllerLibrary,
			action = req.params.action ? req.params.action : '',
			id = req.params.id ? req.params.id : '',
			method = req.method.toLowerCase(),
			fn = '';

	// Go to the default route
	if (controller.length === 0) {
		console.log('Controller not found');

		res.send(404);
		return;
	}

	// Determine the function to call based on the controller/model and method passed
	if (id.length === 0) {
		switch (method) {
			case 'get':
				fn = 'getAll';
				break;

			case 'post':
				fn = 'create';
				break;

			case 'delete':
				fn = 'destroyAll';
				break;
		}

		controllerName = './' + inflection.capitalize(inflection.singularize(controller)) + 'Controller';
	} else {
		switch (method) {
			case 'get':
				fn = 'getOne';
				break;

			case 'post':
				fn = 'update';
				break;

			case 'delete':
				fn = 'destroy';
				break;
		}

		controllerName = './' + inflection.capitalize(controller) + 'Controller';
	}

	controllerLibrary = require(controllerName);

	try {
		if (typeof controllerLibrary[fn] === 'function') {
			controllerLibrary[fn](req, res, next);
		} else {
			console.log(controllerName + " not a function");

			res.send(404);
		}
	} catch (error) {
		console.log(error);
		res.send(404);
	}

}
