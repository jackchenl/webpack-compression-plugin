
## Getting Started

To begin, you'll need to install `webpack-compression-plugin`:

```console
$ npm install webpack-compression-plugin --save-dev
```

Then add the plugin to your `webpack` config. For example:
 **webpack.config.js**
```js
const CompressionWebpackPlugin = require('webpack-compression-plugin');
module.exports = {
  plugins: [  new CompressionWebpackPlugin({
        originPath: `${__dirname}/build`,
        outputPath: `${__dirname}/build.zip`,
      })],
};
```

