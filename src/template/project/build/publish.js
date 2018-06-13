#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');

const glob = require('glob');
const {
	createFile,
	fsExistsSync,
	createDir,
	execCommandSync
} = require('./util');

let pro1 = null;
let pro2 = null;

try {
	let build = spawn('npm', ['run', 'build'], {
		stdio: ['pipe', 'pipe', 'pipe']
	});

	build.stdout.on('data', (res) => {
		console.log(res.toString());
	});
	build.stderr.on('data', (res) => {
		console.error(res.toString());
	});

	build.on('close', (res) => {

		let endCode = res.toString();

		if(parseInt(endCode) === 0) {
			pro1 = new Promise((resolve, reject) => {
				glob(path.join(__dirname, `../assets/**/*.html`), {}, (err, files) => {
					files.map((item) => {
						makePro(item, 'template');
					});
					resolve();
				});
			});

			pro1 = new Promise((resolve, reject) => {
				glob(path.join(__dirname, '../assets/**/*.*'), {}, (err, files) => {
					files.map((item) => {
						makePro(item, 'static');
					});
					resolve();
				});
			});

			Promise.all([pro1, pro2]).then(() => {
				execCommandSync(path.join(__dirname, './release.sh'));
			});
		}
	});
}
catch(e) {

}

function makePro(item, type) {
	const projectDir = path.relative(path.join(__dirname, '../assets'), item);

	const destPath = path.join(__dirname, `../${type}`, projectDir);
	const content = fs.readFileSync(item);

	createProdFile(destPath, content);
}


function createProdFile(dir, content) {
	let targetDir = path.dirname(dir);

	if(!fsExistsSync(targetDir)) {
		createDir(targetDir);
	}

	createFile(dir, content);
}


