#!usr/bin/env node

const program = require('commander');
const donoServer = require('../src/server/dono-server');



program
	.parse(process.argv);


donoServer();
