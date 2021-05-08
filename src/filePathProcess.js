const fs = require('fs')
const path = require('path')
// function pathProcess(dir, filename , data){
//     let reg = new RegExp(/\\/g)
//     let vir = dir.replace(reg,"\/")
//     console.log(`${vir}/models/${filename}Model.ts`);
//     fs.writeFileSync(`${vir}/models/${filename}Model.ts`,data)
//     fs.writeFileSync(`${vir}/models/api/${filename}.ts`,data)
// }
function pathProcess(dir){
    let reg = new RegExp(/\\/g)
    let vir = dir.replace(reg,"\/")
    return vir;
}
// 测试创建文件目录
function mkTestDir(){
    fs.mkdir('e:/lil_liu/我的/cnajdklk/name',function(error){
        if(error){
            console.log(error);
            return ;
        }
        console.log("ndcamc");
    })
}
// let a = pathProcess('e:\\lil_liu\\我的\\cnajdklk\\one.vue')
// mkTestDir()
module.exports = pathProcess
