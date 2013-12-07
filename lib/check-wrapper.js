'use strict';

var uglifyjs = require('uglify-js');


// check if the code content already has module wrapper

// @param {uglifyjs.AST_Node} ast
// @returns {boolean} true if passed checking
exports.check = function(ast) {
    var err;
    ast.figure_out_scope();
    var walker = new uglifyjs.TreeWalker(function(node) {
        if( !err && node.CTOR === uglifyjs.AST_SymbolRef && node.name === 'require'  && !node.undeclared() ){
            err = true;
        }   
    });
    ast.walk(walker);
    return !err;
};