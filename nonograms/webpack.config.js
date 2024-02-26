const path = require('path');
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'script.js'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  }
};