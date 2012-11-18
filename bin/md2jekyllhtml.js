#!/usr/bin/env node

var fs = require('fs');
var md2jekyllhtml = require('../lib/md2jekyllhtml');

var infile = process.argv[process.argv.length-1];
var outfile = infile.replace(/\.md$/, ".html");

fs.writeFileSync(outfile, md2jekyllhtml(fs.readFileSync(infile, 'utf8')), 'utf8')
