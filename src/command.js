const compress = require('./index.js');

const args = process.argv;

const originPath = args[2];
const outputPath = args[3];

compress(originPath, outputPath);