//test runs a specific test on a specified command
exports.test = function(dir,name,command) {
	return function () {
		console.log("\nRunning test "+name+" on "+command+"\n");
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
		var filename = /[0-9]*.output/;
		for(i=0;i<files.length;i++) {
				if(filename.test(files[i])) {
					files.splice(i--,1);
				} else {
					files[i] = files[i].split(".input")[0];
				}
		}
		
		//Start workers to test the files
		for(i=0;i<files.length;i++) {
				var exec = require('child_process').exec;
				var str = command+' < "'+dir+'/'+name+'/'+files[i]+'.input" | diff --ignore-all-space "'+dir+'/'+name+'/'+files[i]+'.output" -';
				exec(str,execComplete(files[i]));
		}
	}
}

function execComplete(id) {
	return function(error,stdout,stderr) {
		code = error || 0;
		switch(code) {
			case 0:
				console.log("Test "+id+" PASSED!");
				break;
			default:
				console.log("Test "+id+" FAILED!");
				break;
		}
	}
}
