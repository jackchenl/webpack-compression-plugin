let fs = require('fs')
let path = require('path')
const fileDir = './mockData'

const name = process.argv[2]
const total = process.argv[3] || 200

if(!name){
    return console.error('请输入指定文件夹名称！！')
}

function generateData(type){
    let data =[]
    for(let i =0; i< total; i++){
        data[i] = {};
        propertyNameAry.forEach(ele=>{ele.func(data[i], i)})
    }
    return {
        body: {
            list: data,
            totalCount: total
        },
        errorCode: null,
        errorMessage: null
    }
}

function dataWriteToFile(){
    // fs.stat(filePath, function(error, stats){
    //     if(eror){
    //         console.warn('获取文件stats失败');
    //     }else{
    //         var isFile = stats.isFile();//是文件
    //         var isDir = stats.isDirectory();//是文件夹
    //     }
    // })
    console.log('start execute generate data!');
    const data = generateData()
    console.log('start write file')
    fs.writeFileSync(`${fileDir}/${name}.json`,JSON.stringify(data),function(err){
        if (err) {
            return console.error(err);
        }
        console.log(filePath+'写入成功')
    })
    console.log('end write file')
}

dataWriteToFile()