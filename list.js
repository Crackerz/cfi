//List all possible tests
exports.list = function(dir) {
	return function () {
		console.log('\nAvailable Practice Problems: \n');
		var fs = require('fs');
		var tests = fs.readdirSync(dir);
		tests.forEach(function(test) {
			if(test.charAt(0)!='.')
				console.log(test);
		});
		console.log();
	};
}
