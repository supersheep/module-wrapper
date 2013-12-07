var depParser   = require("./lib/dep-parser");
var lang        = require('./lib/lang');

function defaultRender(options){
    var deps = options.deps;
    var code = options.code;
    var output = lang.template("{define}({id}[{deps}], function(require, exports, module) {\n" +
        "{code}\n" +
    "});", {
        id:options.id ? ("\"" + options.id + "\", ") : "",
        define:options.define,
        deps:deps.length ? "\"" + deps.join("\", \"") + "\"" : '',
        code:code.replace(/\r|\n/g, '\n')
    });
    return output;
}

/**
 * options:
 *  - id
 *  - define
 */
exports.wrap = function(file,options,callback){
    options = lang.mix({
        define:"define"
    },options || {});

    depParser.parse(file,function(err, data){
        if(err){return callback(err);}
        var deps = data.deps;
        var code = data.code;

        
        var output = (options.render || defaultRender)(
            lang.mix({
                deps:deps,
                code:code
            },options)
        );

        callback(null, {
            output: output,
            deps: deps
        });
    });

}