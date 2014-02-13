//maintainRepo ensures our repo is being maintained and is updated
exports.maintainRepo = function (dir,url,callback) {
	var exec = require('child_process').exec;
	//Ensure git is installed
	var child = exec('command -v git',function(error,stdout,stderr) {
		if(error) {
			console.error('GIT IS NOT INSTALLED');
			process.exit(1);
		}
	});

	//File system maintenence
	var fs = require('fs');
	try {
		fs.mkdirSync(dir);
	} catch(error) {
		if(!error.code=='EEXIST') {
			console.error('Could not access ~/.cfi: '+error.message);
		}
	}
	
	//TODO: Handle errors for git. May not have permission for the specified directory
	var child = exec('git init '+dir, function(error, stdout,stderr) {
		var child = exec('git -C "'+dir+'" remote add origin '+url,function(error,stdout,stderr) {
			var child = exec('git --git-dir="'+dir+'/.git" --work-tree="'+dir+'" reset --hard && git --git-dir="'+dir+'/.git" --work-tree="'+dir+'" pull origin master',function(error,stdout,stderr) {
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
