exports = module.exports = {};

exports.parse = function(args, defaults, replacements) {
    var options = {};
    if (typeof defaults === "object" && !(defaults instanceof Array)) {
        options = defaults
    }

    if (typeof replacements === "object" && !(defaults instanceof Array)) {
        for (var i in args) {
            var arg = args[i];
            if (arg.charAt(0) === "-" && arg.charAt(1) != "-") {
                arg = arg.substr(1);
                if (arg.indexOf("=") !== -1) {
                    arg = arg.split("=");
                    var keys = arg.shift();
                    var value = arg.join("=");

                    arg = keys.split("");
                    var key = arg.pop();
                    if (replacements.hasOwnProperty(key)) {
                        key = replacements[key];
                    }

                    args.push("--" + key + "=" + value);
                } else {
                    arg = arg.split("");
                }

                arg.forEach(function(key){
                    if (replacements.hasOwnProperty(key)) {
                        key = replacements[key];
                    }
                    args.push("--" + key);
                });
            }
        }
    }

    for (var i in args) { //Cycle through args
        var arg = args[i];
        //Check if Long formed tag
        if (arg.substr(0, 2) === "--") {
            arg = arg.substr(2);
            //Check for equals sign
            if (arg.indexOf("=") !== -1) {
                arg = arg.split("=");
                var key = arg.shift();
                var value = arg.join("=");

                if (/^[0-9]+$/.test(value)) {
                    value = parseInt(value, 10);
                }
                options[key] = value;
            } else {
                options[arg] = true;
            }
        }
    }
    return options;
}
