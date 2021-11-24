#!/usr/bin/env node

import fs from "fs";

const CURRENT_DIRECTORY = process.cwd();
const TARGET_DIRECTORY = process.argv[process.argv.length - 1];

function getAllFiles(path) {
	const files = fs.readdirSync(path);
	const result = [];

	files.forEach(function (filename) {
		const fullFilename = path + "/" + filename;

		if (fs.statSync(fullFilename).isDirectory()) {
			if (fullFilename.includes(".git")) {
				return;
			}
			if (fullFilename.includes(".svn")) {
				return;
			}
			result.push(...getAllFiles(fullFilename));
		} else {
			result.push({
				fullFilename,
				filename,
			});
		}
	});

	return result;
}

const FILES = getAllFiles(TARGET_DIRECTORY);

for (const file of FILES) {
	console.log("Copying " + file.fullFilename);
	fs.copyFileSync(file.fullFilename, CURRENT_DIRECTORY + "/" + file.filename);
}

console.log("Done!");
