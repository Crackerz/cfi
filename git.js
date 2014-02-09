//maintainRepo ensures our repo is being maintained and is updated
exports.maintainRepo = function (dir,url,callback) {
	//TODO: Ensure git is installed

	//File system maintenence
	var fs = require('fs');
	try {
		fs.mkdirSync(dir);
	} catch(error) {
		if(!error.code=='EEXIST') {
			//Something is wrong and we can't access our directory! WHAT DO?!?!
			//TODO: Handle error 
			console.log(error.message);
		}
	}
	
	//TODO: Handle errors for git. May not have permission for the specified directory
	var exec = require('child_process').exec;
	var child = exec('git init '+dir, function(error, stdout,stderr) {
		var child = exec('git -C "'+dir+'" remote add origin '+url,function(error,stdout,stderr) {
			var child = exec('git -C "'+dir+'" pull origin master',function(error,stdout,stderr) {
				if(!execResult(error,stdout,stderr)) {
					console.log('exec error: '+error);
				}
				callback();
			});
		});
	});
}

function execResult(error, stdout,stderr) {
	if(error!=null) {
		return false;
	}
	return true;
}
