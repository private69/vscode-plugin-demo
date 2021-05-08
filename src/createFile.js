const path = require('path')
const fs = require('fs')

// 基础目录
let address = "e:\\lil_liu\\我的"
let data

function fsModuleCheck(val) {
    let stat = fs.statSync(val)
    let dir = path.normalize(val)
        // 判断是否是目录
    if (stat.isDirectory()) {
        fs.writeFileSync("fileSet.txt", `${path.dirname(val)}\r\n`, { flag: "a+", encoding: "utf8" })
        fs.readdir(val, function(error, files) {
            if (error) {
                console.log(error);
                return;
            }
            if (files.length < 1) return;
            files.forEach(item => {
                fsModuleCheck(`${val}/${item}`)
            })
        })
    } else {
        fs.writeFileSync("fileSet.txt", `\t${path.basename(val)}\r\n`, { flag: "a+", encoding: "utf8" })
            // console.log(val);
    }
    // console.log(dir);
    // console.log(stat);
}
// 获取特定的文件目录 (异步方式)
function findDir(dir, val) {
    let isDir = fs.statSync(dir)
    if (isDir.isDirectory()) {
        fs.readdir(dir, function(error, files) {
            if (error) {
                console.log(error);
                return;
            }
            if (files.length < 1) return;
            if (files.indexOf(val) != -1) {
                console.log(dir, files);
                data = dir
                return files
            }
            files.forEach(item => {
                if (fs.statSync(`${dir}\\${item}`).isDirectory()) {
                    findDir(`${dir}\\${item}`, val)
                }

            })
        })
    }
    return;
}

function findDirSync(dir, val) {
    let isDir = fs.statSync(dir)
    if (isDir.isDirectory()) {
        let files = fs.readdirSync(dir)
        if (files.length < 1) return;
        if (files.indexOf(val) != -1) {
            console.log(dir, files);
            currentDir = dir
            console.log(new Date().getTime());
            return;
        }
        files.forEach(item => {
            if (fs.statSync(`${dir}\\${item}`).isDirectory()) {
                findDir(`${dir}\\${item}`, val)
            }

        })
    } else return;
}
// fsModuleCheck(address)
function aa() {
    findDir(address, "models");
    setTimeout(() => {}, 1000)
    return function() {
        setTimeout(() => {
            console.log(data);
            return data
        }, 1000)
    }

}
console.log(aa()());