module.exports = {
	development: {
		root: require('path').normalize(__dirname + '/..'),
		app: {
			name: 'test'
		}, 
		db: 'mongodb://localhost/test'
	}, 
	staging: {
		
	}, 
	production: {
		
	}
};