var std = require("./std.js").std;

export var express = {

    sendDataSync: std.autoCurry(function(res, data)
    {
        res.send(data);
    })

};
