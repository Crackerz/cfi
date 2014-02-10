//test runs a specific test on a specified command
exports.test = function(dir,name,command) {
	return function () {
		var fs = require('fs');
		var files;
		try {
			files = fs.readdirSync(dir+"/"+name);
		} catch(error) {
			//WE HAVE AN ERROR!
			if(error.code=="ENOENT") {
				//INVALID NAME!
				console.error("\nInvalid test name!");
				var list = require('./list.js').list(dir); 
				list();
				process.exit(1);
			} else {
				console.error("Unexpected Error: "+error.code);
				process.exit(1);
			}
		}
		//iterate through list of files removing all output files. Match input to output one by one then run tests async.
		//Use regex and splice maybe to do the test.
	}
}
