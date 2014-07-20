var assert = require("assert");
var std = require("../build-common/std.js").std;


describe("std ", function()
{
    it("async ", function(done)
    {
        var fn = std.async(function()
        {
            return 5;
        });

        fn(function(err, result)
        {
            assert(result === 5, "result returned with value " + result);

            done();
        });
    });
    
    it("autoCurry ", function()
    {
        var fn = function(a, b, c)
        {
            return (a + b) * c;  
        };

        var curriedFn = std.autoCurry(fn);
        var fn1 = curriedFn(1);
        var fn1_2 = fn1(2);
        var result = fn1_2(3);
        
        assert( result === 9 , "result returned with value " + result );
    });
    
    it("bind ", function()
    {
        var obj = { rank: 1 };
        var fn = function()
        {
            return this.rank;
        };

        var boundFn = std.bind(fn, obj);
        var result = boundFn();
        
        assert( result === 1 , "result returned with value " + result );
    });

    it("combineAsArray ", function(done)
    {
        var values = [1,
            function(data, cb)
            {
                cb(null, data * data);
            },
            10
        ];

        std.combineAsArray(values, 2, function(err, result)
        {

            assert(result.length === 3, "result returned with length " + result.length);
            assert(result[0] === 1, "result 0 === " + result[0]);
            assert(result[1] === 4, "result 1 === " + result[1]);
            assert(result[2] === 10, "result 2 === " + result[2]);

            done();
        });
    });

    it("curry ", function()
    {
        var sum = function(a, b)
        {
            return a + b;
        };
        
        var sum2 = std.curry(sum,2);
        var result = sum2(3);
        
        assert( result === 5 , "result returned with value " + result );
    });

    it("eachSeries ", function(done)
    {
        var values = [1, 2, 3];
        var counter = 1;

        var sum = std.eachSeries(function(x, cb)
        {
            counter += x;
            cb();
        });

        sum(values, function()
        {
            assert(counter === 7, "final value of " + counter);

            done();
        })
    });

    it("flatten ", function(done)
    {
        var values = [1, [2, 3, [4, 5]]];

        std.flatten(values, function(err, result)
        {

            assert(result.length === 5, "result returned with length " + result.length);
            assert(result[0] === 1, "result 0 === " + result[0]);
            assert(result[1] === 2, "result 1 === " + result[1]);
            assert(result[2] === 3, "result 2 === " + result[2]);
            assert(result[3] === 4, "result 3 === " + result[2]);
            assert(result[4] === 5, "result 4 === " + result[2]);

            done();

        });
    });

    it("map ", function(done)
    {
        var values = [1, 2, 3];
        var squaringMap = std.map(
            function(v, cb)
            {
                cb(null, v * v);
            }
        );

        squaringMap(values, function(err, result)
        {

            assert(result.length === 3, "result returned with length " + result.length);
            assert(result[0] === 1, "result 0 === " + result[0]);
            assert(result[1] === 4, "result 1 === " + result[1]);
            assert(result[2] === 9, "result 2 === " + result[2]);

            done();

        });
    });

    it("reduce ", function(done)
    {
        var sum = std.reduce(
            function(memo, x, cb)
            {
                cb(null, memo + x);
            }, 0);

        sum([1, 2, 3],
            function(err, result)
            {
                assert(result === 6, "result returned with value " + result);

                done();
            });
    });

    it("seq ", function(done)
    {
        var stepper = std.seq(
            function(a, cb)
            {
                cb(null, a + 1);
            },
            function(a, cb)
            {
                cb(null, a + 1);
            },
            function(a, cb)
            {
                cb(null, a + 1);
            }
        );

        stepper(0, function(err, result)
        {
            assert(result.length === 1, "result returned with length " + result.length);
            assert(result[0] === 3, "result[0] returned with value " + result[0]);

            done();
        });
    });

    it("spread ", function(done)
    {
        var values = [1,
            function(data, cb)
            {
                cb(null, data * data);
            },
            10
        ];

        var spreadFn = std.spread(function(x, y, z, callback)
        {
            callback(null, x + y + z);
        });

        spreadFn([1, 2, 3], function(err, result)
        {
            assert(result === 6, "result returned with value " + result);

            done();
        });
    });
});