
var fs = require("fs-sync");
var chai = require("chai");
var assert = chai.assert;
var depParser = require("../lib/dep-parser");
var errors = require("../lib/errors");
var expect = chai.expect;

chai.should();


describe('test wrap-module', function(){
    function runAssert(opt){
        it(opt.desc,function(done){
            depParser.parse("tests/fixtures/" + opt.file,function(){
                opt.assert.apply(this,arguments);
                done();
            });
        });
    }


    [
    {
        desc:'should throw syntax error when parsing file with wrong syntax',
        file:"err-syntax.js",
        assert:function(err,deps){
            expect(err).to.be.an.instanceof(SyntaxError);
        }
    },
    {
        desc:'should throw syntax error when parsing file wrong use of require with argument not a string',
        file:"require-with-argument-not-a-string.js",
        assert:function(err,deps){
            expect(err).to.be.an.instanceof(SyntaxError);
            err.message.indexOf("`require` should have one and only one string as an argument.").should.not.equal(-1);
        }
    },
    {
        desc:'should throw syntax error when parsing file wrong use of require',
        file:"require-with-multi-arg.js",
        assert:function(err,deps){
            expect(err).to.be.an.instanceof(SyntaxError);
            err.message.indexOf("`require` should have one and only one string as an argument.").should.not.equal(-1);
        }
    },
    {
        desc:"should throw already wrapped error when parsing wrapped module",
        file:"wrapped.js",
        assert:function(err,deps){
            expect(err.name).to.equal("AlreadyWrappedError");
            expect(err).to.be.an.instanceof(errors.AlreadyWrappedError);
        }
    },
    {
        desc:"should be able to parse deps for node module",
        file:"raw.js",
        assert:function(err,deps){
            expect(deps).to.deep.equal({
                code:fs.read("tests/fixtures/raw.js"),
                deps:["a","b"]
            });
        }
    }
    ].forEach(runAssert);


});
