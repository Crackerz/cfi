var repo_url = 'git@github.com:Crackerz/cfi_tests.git';
var repo_path = process.env['HOME']+'/.cfi';

(function () {
		//Logic for executing the file
		var args = process.argv.splice(2);
		var git = require('./git.js');
		switch(args[0]) {
		case 'list':
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

//List all possible tests
function list() {
		console.log('\nAvailable Practice Problems: \n');
		var fs = require('fs');
		var tests = fs.readdirSync(repo_path);
		tests.forEach(function(test) {
			if(test.charAt(0)!='.')
				console.log(test);
		});
		console.log();
}

//test runs a specific test on a specified command
function test(name,command) {

}

//help prints help information to stdout
function help() {

}
