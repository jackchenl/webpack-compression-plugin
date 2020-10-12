const path = require("path");
const pluginName = 'CompressionWebpackPlugin';
const Compress = require('./index.js');

class ArchiverZipWebpackPlugin {
    constructor(options){
        this.options = options;
    }
    apply(compiler) {
        const { originPath, outputPath } = this.options;
        if(!originPath || !outputPath){
            throw new Error('请先设置webpack-compression-plugin的originPath和outputPath属性')
        }
        compiler.hooks.run.tap(pluginName, compilation => {
            // console.log('arguments=',arguments);
            // console.log("🐴🐶webpack 构建过程开始！");
            // console.log("============================");
            // console.log('this.this.options=',this.options)
        });
        compiler.plugin('compile', function (compilation) {
                // console.log('webpack 编译器开始编译...-----');
                // console.log('arguments=',arguments);
                // console.log('compilation=',compilation.compilation);
        })
        compiler.plugin('compilation', function (compilation) {
            // console.log('编译器开始一个新的编译任务...-----')
            compilation.plugin('optimize', function () {
                    // console.log('编译器开始优化文件...')
                    // console.log('arguments=',arguments);
            })
        })
        compiler.plugin('done', function (stats) {
            // console.log('originPath=',originPath);
            // console.log('done--stats=',stats);
            //发生错误时，不执行压缩文件夹的操作。
            if((stats.compilation.errors || []).length){
                console.log(stats.compilation.errors.join(';'))
                return;
            }
            Compress && Compress(originPath, outputPath);
        })
	    compiler.plugin('failed', function (error) {
           console.log(error);
        })
    }
}

module.exports = ArchiverZipWebpackPlugin;
