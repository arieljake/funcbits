"use strict";
var std = require("./std.js").std;

var express = {

    sendDataSync: std.autoCurry(function(res, data)
    {
        res.send(data);
    })

};
exports.express = express;