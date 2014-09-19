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

Basically, I have come to feel that currying is cool. Seems like it could be fast, concise and super testable.

To fully leverage functional programming concepts in Javascript, we need:

1. A set of clear functional programming principles.
2. The basic building blocks of a functional programming framework.
3. A complimentary set of conventions, configurations, and utilities to simplify functional programming projects.

Func(tional) Bits is an effort towards that.


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

To leverage currying, function arguments need to be ordered according to their currying relevance, with the data argument last.

	For example, Underscore's map function:
	
	`_.map(list, iterator, [context])`
	
This map function is difficult to curry because 'list', the data argument, is first. We typically want to pass our data last after all other parameters of how the function will be behave have been 'loaded' through arguments. A more useful map definition would be:
	
	`_.map(iterator, context, list)`
	
Note: Currying functions like Underscore's map, where the arguments are inconveniently ordered for currying, is what the [partial](http://fitzgen.github.io/wu.js/#wu-partial) function in wu.js is intended for. It lets you curry arguments that are positioned anywhere in the function definition using the wu.___ constant as a placeholder to skip arguments you want to pass later.
	
When a library is well designed for currying, a natural flow develops that can curry, or 'prepare', functions as code is doing its job. For example:
