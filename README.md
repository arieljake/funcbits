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

Basically, currying can be fast, concise and super testable.

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
	
Note: Currying functions like Underscore's map, where the arguments are inconveniently ordered for currying, is what the [partial](http://fitzgen.github.io/wu.js/#wu-partial) function in wu.js is intended for. It lets you curry arguments that are positioned anywhere in the function definition using the wu.___ constant as a placeholder to skip arguments you want to provide later.

Note: Essentially, you can think of constructors in object oriented as a form of currying. For all public methods on your objects, you are able to ask for whatever data you need to complete the function. When you realize that all or many of your public methods are asking for the same argument, you might replace asking again and again with adding the argument to the constructor...such as what happened to object state in the transition from procedural to object oriented programming:

	replace(string, regex, replacement) <----> string.replace(regex, replacement)

When a library is well designed for currying, a natural flow can develop in which functions are prepared gradually as data becomes available to the process. For example, let's say we are handling a user's request to see their inbox sorted in their favorite way. When the request is first being handled, we might only have the user's id. We might use the user id to retrieve the user record, which might itself lead us to the user's inbox settings, which might finally lead us to the user's email data, and finally we are ready to generate output. Ideally, as soon as we load some data, we are able to deposit it into the process immediately for inclusion so we don't have to hold onto it anymore, and be able to pass control to whatever is the next step in the process.

	Step 1: Load User with user ID
	process.curry(user)
	
	Step 2: Load Inbox settings
	process.curry(inboxSettings)
	
	Step 3: Load emails
	process.curry(emails)
	
	Step 4: Generate Output
	process();
