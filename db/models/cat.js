var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	name: String
});

// Compile schema into a model
mongoose.model('Cat', catSchema);