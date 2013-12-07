#module-wrapper [![Build Status](https://travis-ci.org/supersheep/module-wrapper.png?branch=master)](https://travis-ci.org/supersheep/module-wrapper)


wrap a commonjs module to module-wrapping/module-transport style

###usage

	var wrapper = require("module-wrapper");

	wrapper.wrap("a.js", {
		id:"a"
	}, function(err, content){
		// use the content
	});

### options

	- id: `id` of the module, it passed will result
	- define: `define` function for your loader, defaults to "define"
	- render: render function accept arguments and output the final code

### default result
	
input.js:

	var b = require("b");
	var c = require("c");

output:

	define(["b", "c"], function() {
	var b = require("b");
	var c = require("c");
	});


### customize your renderer

the `render` function accept an `option` argument which contains fields as below:

	- define: the define function name
	- code: the raw origin code
	- deps: the dependencies of the module
	- id: the identifier of the module

### errors
	
	- SyntaxError: throw when fail to pass module dependencies
	- AreadyWrappedError: throw when module is already wrapped
	
