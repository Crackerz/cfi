The Coding For Interviews Verification Tool
===

## Usage

To give it a spin you can do the following:

    node index.js list

    node index.js test "Tree Zig Zag" "command for executing your tree-zig-zag solution"

NOTE: your command will be dumped directly into terminal, so if it is a python file do ./tree_zig_zag.py

## How it works

It maintains a clone of of the cli_tests repo in ~/.cfi, each folder is a problem, each problem contains unit tests [0-9]*.{input,ouput}
It loads these in and runs unit tests asynchronously.

Build Status
===

[![Build Status](https://travis-ci.org/codingforinterviews/cfi.png?branch=master)](https://travis-ci.org/codingforinterviews/cfi)
