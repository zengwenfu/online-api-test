//const {errCode} = require('./../../../config/application.config');
const pug = require('pug');

exports.buildWebPageFromData = function(theInstaclipData) {
  let compiledFunction = null;
  //console.log(theInstaclipData);
  if (theInstaclipData === null) {
    compiledFunction = pug.compileFile(`${__dirname}/../instaclip-templates/invalid.pug`);
  } else {
    switch (theInstaclipData.type) {
      case 'mp4':
        compiledFunction = pug.compileFile(`${__dirname}/../instaclip-templates/mp4.pug`);
        break;
      case 'jpg':
      case 'png':
        compiledFunction = pug.compileFile(`${__dirname}/../instaclip-templates/img.pug`);
        break;

      default:
        compiledFunction = pug.compileFile(`${__dirname}/../instaclip-templates/valid.pug`);
    }
  }

  return compiledFunction(theInstaclipData);
};
