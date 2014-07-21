"use strict";
var ARR_SLICE = Array.prototype.slice;
var ARR_IS = Array.isArray;

var isInstance = function(obj, Type)
    {
        return obj instanceof Type;
    },
    toObjProtoString = function(obj)
    {
        return Object.prototype.toString.call(obj);
    },
    toArray = function(obj)
    {
        return ARR_SLICE.call(obj);
    },
    toBool = function(obj)
    {
        return !!obj;
    },
    isArguments = function(obj)
    {
        return !!(obj && _.has(obj, 'callee'));
    };

var std = {};
exports.std = std;
std.async = function(fn)
{
    return function()
    {
        var that = this;
        var args = toArray(arguments);
        var callback = args.pop();

        var result = fn.apply(that, args);
        callback(null, result);
    }
};

std.autoCurry = function autoCurry(fn, numArgs)
{
    numArgs = numArgs || fn.length;

    return function()
    {
        if (arguments.length < numArgs)
        {
            return numArgs - arguments.length > 0 ?
                std.autoCurry(std.curry.apply(this, [fn].concat(toArray(arguments))),
                    numArgs - arguments.length) :
                std.curry.apply(this, [fn].concat(toArray(arguments)));
        }
        else
        {
            return fn.apply(this, arguments);
        }
    };
};

std.bind = function bind(fn, scope)
{
    return function()
    {
        return fn.apply(scope, toArray(arguments));
    };
};

std.combineAsArray = std.autoCurry(function combineAsArray(arr, data, callback)
{
    std.map(function(x, cb)
        {
            if (isInstance(x, Function) === false)
                return cb(null, x);

            x(data, function(err, v)
            {
                cb(null, v);
            });
        },
        arr,
        callback);
});

std.curry = function curry(fn /* variadic number of args */ )
{
    var args = ARR_SLICE.call(arguments, 1);

    return function()
    {
        return fn.apply(this, args.concat(toArray(arguments)));
    };
};

std.eachSeries = std.autoCurry(function(iterator, arr, callback)
{
    callback = callback || function() {};
    if (!arr.length)
    {
        return callback();
    }
    var completed = 0;
    var iterate = function()
    {
        iterator(arr[completed], function(err)
        {
            if (err)
            {
                callback(err);
                callback = function() {};
            }
            else
            {
                completed += 1;
                if (completed >= arr.length)
                {
                    callback();
                }
                else
                {
                    iterate();
                }
            }
        });
    };
    iterate();
});

std.echoInput = std.autoCurry(function(data, callback)
{
    console.dir(arguments);
    callback(null, data);
});

std.flatten = function(arr, callback)
{
    if (isInstance(arr, Array) === false)
        return callback(null, arr);

    std.reduce(
        function(memo, x, cb)
        {
            std.flatten(x, function(err, v)
            {
                cb(null, memo.concat(v));
            });
        }, [],
        arr,
        callback
    );
};

std.map = std.autoCurry(function map(iterator, arr, callback)
{
    std.reduce(
        function(memo, x, cb)
        {
            iterator(x, function(err, v)
            {
                cb(null, memo.concat(v));
            });
        }, [],
        arr,
        callback
    );
});

std.reduce = std.autoCurry(function red(iterator, memo, arr, callback)
{
    std.eachSeries(
        function(x, callback)
        {
            iterator(memo, x, function(err, v)
            {
                memo = v;
                callback(err);
            });
        },
        arr,
        function(err)
        {
            callback(err, memo);
        });
});

std.seq = function sequence( /* variadic number of functions */ )
{
    var fns = arguments;

    return function()
    {
        var that = this;
        var args = toArray(arguments);
        var callback = args.pop();

        std.reduce(
            function(newargs, fn, cb)
            {
                fn.apply(that, newargs.concat([

                    function()
                    {
                        var err = arguments[0];
                        var nextargs = ARR_SLICE.call(arguments, 1);
                        cb(err, nextargs);
                    }
                ]))
            },
            args,
            fns,
            callback);
    };
};

std.spread = std.autoCurry(function spread(fn, args, callback)
{
    fn.apply(this, args.concat(callback));
});