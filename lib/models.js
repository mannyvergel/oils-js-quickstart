var mongoose = require('mongoose');
var fileUtils = include('/lib/utils/fileUtils');
var Schema = mongoose.Schema;

exports.getModels = function(callback) {
	getModelsFromDir('/models', callback);
}



function getModelsFromDir(dir, callback) {
	var models = [];
	fileUtils.recurseJs(dir, function(err, opts) {
		if (!opts.isDirectory()) {

			var absPath = opts.absolutePath;
			var modelJs = require(absPath);
			var conn = connections.mainDb;
			var model = conn.model(opts.name, new Schema(modelJs.schema));

			if (callback) {
				callback(null, model, opts);
			}
		}
	})

	return models;

}