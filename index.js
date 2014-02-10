var repo_url = 'git@github.com:codingforinterviews/cfi_tests.git';
var repo_path = process.env['HOME']+'/.cfi';

(function () {
		//Logic for executing the file
		var args = process.argv.splice(2);
		var git = require('./git.js');
		switch(args[0]) {
		case 'list':
				var list = require('./list.js').list(repo_path);
				git.maintainRepo(repo_path,repo_url,list);
				break;
		case 'test':
				git.maintainRepo(repo_path,repo_url,test);
				break;
		default:
				console.log('other');
				break;
		}
}).call(this);

//test runs a specific test on a specified command
function test(dir,name,command) {

}

//help prints help information to stdout
function help() {

}
