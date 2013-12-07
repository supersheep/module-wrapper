

var fs = require("fs-sync");
var chai = require("chai");
var assert = chai.assert;
var wrapper = require("../");
var errors = require("../lib/errors");
var expect = chai.expect;
var node_path = require("path");
var lang = require("../lib/lang");

chai.should();


describe('test wrap-module', function(){
    function runAssert(opt){
        var fixture = node_path.join("tests","fixtures",opt.fixture);
        var expected = node_path.join("tests","expect",opt.expect);
        it(opt.desc,function(done){
            wrapper.wrap( fixture, opt.options, function(err, result){
                expect(result.deps).to.deep.equal(opt.deps);
                expect(result.output).to.equal(fs.read(expected,"utf8"));

                opt.assert && opt.assert.apply(this,arguments);
                done();
            });
        });
    }

    var versions = {
        a:"0.0.1",
        b:"0.0.2"
    };

    [
    {
        desc:'should wrap module properly',
        fixture:"raw.js",
        expect:"raw-wrapped.js",
        deps:["a","b"],
        options:{
            id:"raw"
        }
    },
    {
        desc:'module without id',
        fixture:"raw.js",
        expect:"raw-wrapped-no-id.js",
        deps:["a","b"]
    },
    {
        desc:'module without custom `define`',
        fixture:"raw.js",
        expect:"raw-wrapped-custom-define.js",
        deps:["a","b"],
        options:{
            define:"somelib.define",
            id:"raw"
        }
    },
    {
        desc:'custom renderer',
        fixture:"raw.js",
        expect:"raw-wrapped-custom-renderer.js",
        deps:["a","b"],
        options:{
            id:"raw",
            render:function(opts){
                var deps = opts.deps.map(function(dep){
                    return [dep,versions[dep]].join("@");
                });
                var code = opts.code;
                var output = lang.template("{define}({id}[{deps}], function(require, exports, module) {\n" +
                    "{code}\n" +
                "});", {
                    id:opts.id ? ("\"" + opts.id + "\", ") : "",
                    define:opts.define,
                    deps:deps.length ? "\"" + deps.join("\", \"") + "\"" : '',
                    code:code.replace(/\r|\n/g, '\n')
                });
                return output;
            }
        }
    },
    ].forEach(runAssert);
});
