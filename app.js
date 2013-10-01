#!/usr/bin/env node

var tags = require("./lib/tags.js");
var search = require("./lib/search.js");


var defaults = {
    path: ".",
    query: "",
    depth: 2
}
var replacements = {
    p: "path",
    q: "query",
    d: "depth",
    h: "help"
}

tags = tags.parse(process.argv, defaults, replacements);

if (tags.help) {
    console.log("Usage: ./app.js -q=query [-d=depth] [-p=path]");
} else {
    search.scan(tags.path, tags.depth, function(err, files) {
        search.match(tags.query, files).forEach(function(file){
            console.log(file);
        });
    });
}
