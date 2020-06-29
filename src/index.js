// require modules
var fs = require('fs');
var path = require('path');
var archiver = require('archiver');

function handleFiles(filePath, fileName, archive, originPath) {
  // console.log('handleFiles-filePath=', filePath);
  let content = fs.readFileSync(filePath);
  if (content) {
    const curPrefix = filePath.replace(originPath, '').replace(fileName, '');
    archive.append(content, {
      prefix: curPrefix,
      name: fileName,
    });
  }
}

function handleDir(dirName, archive) {
  // console.log('handleDir-dirName=', dirName);
  archive.directory(`${dirName}/`, dirName);
}

function fileDisplay(curPath, archive, originPath) {
  console.log('start execute readDir');
  const fileAry = fs.readdirSync(curPath);
  fileAry.forEach((ele) => {
    // console.log('ele=', ele);
    const newPath = `${curPath}/${ele}`;
    if(fs.statSync(newPath).isDirectory()){
      handleDir(ele, archive);
      fileDisplay(newPath, archive, originPath);
    }else{
      handleFiles(newPath, ele, archive, originPath);
    }
  });
}

function successCallBack(archive) {
  archive.finalize();
}

function Compress(originPath, outputPath) {
  var output = fs.createWriteStream(outputPath);
  var archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function () {
    console.log('Data has been drained');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      console.log(`this is warning: ${JSON.stringify(err)}`);
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);
  fileDisplay(originPath, archive, originPath);
  successCallBack(archive);
}

module.exports = Compress;