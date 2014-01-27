/*
 Global variables:
 global.isProd - checks if running in openshift server
 connections.mainDb - main mongoose db
 models.[model name]
 oils.isDebug - setting to true usually means more logging
*/

module.exports = {
	connections: {
		//later support for multiple mongoose databaes
		mainDb : {
			url: getDbUrl()
		}
	},
	debug: false //oils.isDebug
}

function getDbUrl() {
	if (global.isProd) {
	  return process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
	} else {
	  return 'mongodb://localhost/test';
	}
}