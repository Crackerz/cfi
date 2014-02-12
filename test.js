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
		var filename = /[0-9]*.output/;
		for(i=0;i<files.length;i++) {
				if(filename.test(files[i])) {
					files.splice(i--,1);
				} else {
					files[i] = files[i].split(".input")[0];
				}
		}
		console.log(files);
		
		//Start workers to test the files
		for(i=0;i<files.length;i++) {
				var exec = require('child_process').exec;
				var str = command+' < "'+dir+'/'+name+'/'+files[i]+'.input"';
				console.log(str);
				var child = exec(str, function(error,stdout,stderr) {
					console.log("stdout: "+stdout);	
				});
		}
	}
}

function runTest(id,command) {
	return function(error,input) {
		if(error) {
				console.log("Unable to open input for "+id);
				return;
		}
		console.log("running process: ",id);
		var exec = require('child_process').exec;
		var child = exec("exec "+command, function(error,stdout,stderr) {
			console.log("stdout "+id+": "+stdout);	
		});
		console.log("writing to stdin: ",id);
		child.stdin.write(input);
	}
}
