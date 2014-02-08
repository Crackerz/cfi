var repo_url = "git@github.com:Marak/colors.js.git";
var repo_path = process.env["HOME"]+"/.cfi";
(function () {
		console.log(repo_path);
		//Logic for executing the file
		var args = process.argv.splice(2);
		switch(args[0]) {
		case "list":
				maintainRepo(list);
				break;
		case "test":
				maintainRepo(test());
				break;
		default:
				console.log("other");
				break;
		}
}).call(this);

//List all possible tests
function list() {
		console.log("list");
}

//test runs a specific test on a specified command
function test(name,command) {

}

//help prints help information to stdout
function help() {

}

//maintainRepo ensures our repo is being maintained and is updated
function maintainRepo(callback) {
	//File system maintenence
	var fs = require('fs');
	try {
		fs.mkdirSync(repo_path);
	} catch(error) {
		if(!error.code=="EEXIST") {
			//Something is wrong and we can't access our directory! WHAT DO?!?!
			//TODO: Handle error 
			console.log(error.message);
		}
	}
	
	var cwd = process.cwd();
	try {
		process.chdir(repo_path);
	} catch(error) {
		//TODO: handle error
	}
	//TODO: Ensure git is installed
	var exec = require('child_process').exec;
	var child = exec("git init", function(error, stdout,stderr) {
		console.log("STDOUT: "+stdout);
		console.log("STDERR: "+stderr);
		if(error!=null) {
			console.log("exec error: "+error);
		}
		var child = exec("git remote add origin "+repo_url,function(error,stdout,stderr) {
			console.log("STDOUT: "+stdout);
			console.log("STDERR: "+stderr);
			if(error!=null) {
				console.log("exec error: "+error)
			}
			var child = exec("git pull origin master",function(error,stdout,stderr) {
					console.log("STDOUT: "+stdout);
					console.log("STDERR: "+stderr);
					if(error!=null) {
						console.log("exec error: "+error)
					}
				callback();
			})
		});
	});
}
