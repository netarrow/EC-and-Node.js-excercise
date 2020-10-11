'use strict';

if (process.argv.length < 3) {
  console.log('Usage: node build-index.js inFile outFile');
  console.log('    All file names are relative to the project directory.')
  console.log('Example: node build-index.js src/index.html docs/index.html');
  process.exit(1);
}

const fs = require('fs');
const path= require('path');
const lodash = require('lodash'); // already pulled in by dev dependencies

const projectDir = path.join(__dirname, '/../');
process.chdir(projectDir);

const tmpl = fs.readFileSync(path.normalize(process.argv[2]), {encoding: 'utf8'});
const result = lodash.template(tmpl, {variable: 'require'})(require);
fs.writeFileSync(path.normalize(process.argv[3]), result);