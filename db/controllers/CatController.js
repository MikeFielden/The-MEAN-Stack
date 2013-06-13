/** 
 *	CatController
 **/

module.exports = {
	/**
	 *	Default mapping to GET '/cats'
	 **/		
	getAll: function (req, res, next) {
		
		res.send([{
			name: 'Thomas McStinkerton'
		}, {
			name: 'The Twilight dude that shines'
		}]);
	},

	/**
	 *	Default mapping to GET '/cat/:id'
	 **/
	getOne: function (req, res, next) {
		res.send({
			name: 'Garfield'
		});
	}
};	