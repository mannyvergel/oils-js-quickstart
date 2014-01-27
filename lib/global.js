var conf = include('/conf/conf.js');
var models = require('./models');

global.oils = {
	isProd: (process.env.OPENSHIFT_MONGODB_DB_URL != null),
	isDebug: conf.debug,
}

global.models = new Object();
models.getModels(function(err, model, opts) {
	var name = opts.name;
	global.models[name] = model;
	//models[name] = model;

	/*var Book = global.models[name];
	Book.find({}, function(err, books) {
		for (var i in books) {
			var book = books[i];
			console.log('HELLO! ' + book.title);
		}

		//if (!books) {
			// var book = new Book();
			// book.author = 'Manny';
			// book.title = 'Pesobility';
			// book.publishDt = new Date();
			// book.save();
			// console.log('Book created');
		//}
		
	})
	console.log(JSON.stringify(global.models));
	//console.log('!!! ' + global.models[name]);
	*/
});