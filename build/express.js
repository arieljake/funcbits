define("express", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var std = require("./std.js").std;

    var express = {

        sendDataSync: std.autoCurry(function(res, data)
        {
            res.send(data);
        })

    };
    __exports__.express = express;
  });