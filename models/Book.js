module.exports = {
	//mongoose schema, see mongoosejs.com for more info
	schema: {
		author: String,
		title: String,
		publishDate: Date
	},

	initSchema: function(schema) {
		//initialize the schema if needed, else this
		//methos is optional
	}
}