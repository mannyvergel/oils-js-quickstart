var conf = include('/conf/conf.js');

if (!global.connections) {
	global.connections = [];
}

var showLog = true;

for (var i in conf.connections) {
	var dbConf = conf.connections[i];

	if (!global.connections[i]) {
		var mongoose = require('mongoose');

		var url = dbConf.url;
		
		var counter = 0;
		var errFunc = function (err) {
			if (err) {
				setTimeout(function() {
					counter++;
					if (showLog) {
						showLog = false;
						console.error("[Retry " + (counter) +  "] Cannot connect retrying..." + err);
						global.connections[i].close();
						setTimeout(function() {
							showLog = true;
						}, 30000)
					}
					connect();
				}, 2000);
				
			}
		}

		var connect = function() {
			global.connections[i].open(url, errFunc);
		}

		global.connections[i] = mongoose.createConnection();
		console.log('connections.' + i + ' created.');
		global.connections[i].on('error', errFunc);
		global.connections[i].on('open', function() {
			counter = 0;
			showLog = true;
		});

		connect();
	}
}

// if (!global.connMain) {
// 	var mongoose = require('mongoose');

// 	var connMainUrl = conf.dbUrl;
	
// 	var counter = 0;
// 	var errFunc = function (err) {
// 		if (err) {
// 			counter++;
// 			if (counter < 2) {
// 				console.error("Cannot " + (counter) +  " connect retrying..." + err);
// 				global.connMain.close();
// 				//stop logging after several
// 			}
// 			connect();
// 		}
// 	}

// 	var connect = function() {
// 		global.connMain.open(connMainUrl, errFunc);
// 	}

// 	global.connMain = mongoose.createConnection();
// 	global.connMain.on('error', errFunc);
// 	global.connMain.on('open', function() {
// 		counter = 0;
// 	});

// 	connect();
// }

// module.exports = exports = global.connMain;
