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
				if(args.length!=3) {
					//Not enough/too many parameters. Reprint help test
					console.error("Not the correct number of parameters");
					process.exit(1);
				}
				var testName = args[1];
				var program = args[2];
				var test = require('./test.js').test(repo_path,testName,program); 
				git.maintainRepo(repo_path,repo_url,test);
				break;
		default:
				console.log('other');
				break;
		}
}).call(this);

//help prints help information to stdout
function help() {

}
