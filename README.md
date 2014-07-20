#funcbits

###bits of functionality useful for functional programming in Javascript

This project is inspired (and borrows from) several projects:

* [wu.js](https://github.com/fitzgen/wu.js) - functional, lazy programming
* [bluebird](https://github.com/petkaantonov/bluebird) - promises
* [bacon.js](https://github.com/baconjs/bacon.js) - functional, reactive programming
* [async](https://github.com/caolan/async) - 'functional', async programming
* [underscore](http://underscorejs.org/) - functional programming


I felt a rare tingle when I saw currying, and have since been trying to figure out functional programming in Javascript. Seems like it could be fast, concise and super testable.

As I see it, to fully leverage functional programming concepts in Javascript, we need:

1. A set of functional programming principles to guide the community in maintaining a framework.
2. The basic building blocks of a functional programming framework.
3. A framework with conventions, configurations, and compilations to simplify functional programming projects.

This github repo attempts to address #1 and #2.


# Functional Programming Principles

* To leverage currying, function arguments should be ordered according to their currying relevance.

	For example, Underscore's map function:
	
	`_.map(list, iterator, [context])`
	
	This map function is difficult to curry because it has the list argument first, and we typically want to pass our data last, after all other arguments of the function have been 'loaded'. A more useful map definition:
	
	`_.map(iterator, context, list)`
	
	> Currying functions like map in Underscore where the arguments are inconveniently ordered is what the [partial](http://fitzgen.github.io/wu.js/#wu-partial) function in wu.js is useful for, as it lets you curry arguments that are positioned anywhere in the function definition using the wu.___ constant to skip those you want to pass later.
	
	