// require modules
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function handleFiles(filePath, fileName, archive, originPath) {
  const relativePath = path.relative(originPath, filePath);
  archive.file(filePath, { name: relativePath });
}

function handleDir(dirPath, archive, originPath) {
  const relativePath = path.relative(originPath, dirPath);
  archive.directory(dirPath, relativePath);
}

function fileDisplay(curPath, archive, originPath) {
  console.log('start execute readDir');
  const fileAry = fs.readdirSync(curPath);
  fileAry.forEach((ele) => {
    const newPath = path.join(curPath, ele);
    const stat = fs.statSync(newPath);

    if (stat.isDirectory()) {
      handleDir(newPath, archive, originPath);
    } else {
      handleFiles(newPath, ele, archive, originPath);
    }
  });
}

function Compress(originPath, outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    output.on('close', () => {
      console.log(`${archive.pointer()} total bytes`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        reject(err);
      }
    });

    archive.pipe(output);
    fileDisplay(originPath, archive, originPath);
    archive.finalize();
  });
}

module.exports = Compress;
