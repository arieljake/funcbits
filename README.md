#funcbits

###bits of functionality useful for functional programming in Javascript

This project is inspired (and borrows from) several projects:

* [wu.js](https://github.com/fitzgen/wu.js) - functional, lazy programming
* [bluebird](https://github.com/petkaantonov/bluebird) - promises
* [bacon.js](https://github.com/baconjs/bacon.js) - functional, reactive programming
* [async](https://github.com/caolan/async) - 'functional', async programming
* [underscore](http://underscorejs.org/) - functional programming
* [lodash](http://lodash.com/) - functional programming
* [ramda](https://github.com/CrossEye/ramda) - functional programming
* [allong.es](http://allong.es/) - function combinator and decorator recipes
* [lemonad](http://fogus.github.io/lemonad/) - functional programming

I felt a rare tingle when I saw currying, and have since been trying to figure out functional programming in Javascript. Seems like it could be fast, concise and super testable.

As I see it, to fully leverage functional programming concepts in Javascript, we need:

1. A set of functional programming principles to guide the community in maintaining a framework.
2. The basic building blocks of a functional programming framework.
3. A framework with conventions, configurations, and compilations to simplify functional programming projects.

This github repo attempts to address #1 and #2.


## Quick Start (Node)

Install:

	npm install funcbits

Usage:

	var funcbits = require('funcbits');
	var std = funcbits.std;
	var exp = funcbits.express;
	var trx = require("./myFuncs/translationApi.js");

	router.get('/translate', function(req, res)
	{
	    var userQuery = req.query.q;
	    var toLang = req.query.toLang || "en";

	    var translate = std.seq(
	        trx.detectLanguage,
	        std.combineAsArray([std.echoInput, toLang, userQuery]),
	        std.spread( trx.translate ),
	        std.async( exp.sendDataSync(res) )
	    );

	    translate(userQuery, function(err, result) {
        	console.log("translation complete");
	    });
	});

## Functional Programming Principles

* To leverage currying, function arguments should be ordered according to their currying relevance.

	For example, Underscore's map function:
	
	`_.map(list, iterator, [context])`
	
	This map function is difficult to curry because it has the list argument first, and we typically want to pass our data last, after all other arguments of the function have been 'loaded'. A more useful map definition:
	
	`_.map(iterator, context, list)`
	
	> Currying functions like map in Underscore where the arguments are inconveniently ordered is what the [partial](http://fitzgen.github.io/wu.js/#wu-partial) function in wu.js is useful for, as it lets you curry arguments that are positioned anywhere in the function definition using the wu.___ constant to skip those you want to pass later.
	
	