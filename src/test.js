const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const provideDefinition = require('./gotoProviderDefinition')

const data = {
    // 注册命令
    disposable: vscode.commands.registerCommand('vscode-plugin-demo.helloWorld', function (e) {
        // The code you place here will be executed every time your command is executed
        console.log(path.normalize(e.fsPath));
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from vscode-plugin-test!');
    }),
    // 自定义命令 ( 获取当前的文件路径 )
    getTheFilePath: vscode.commands.registerCommand('extension.test.fileUri', function(filePath){
        vscode.window.showInformationMessage(`当前文件路径 ${filePath?filePath:'null'}`)
    }),
    // 监听文本编辑器 ( 输入新建文件的名称 )
    getTextEditor: vscode.commands.registerTextEditorCommand('extension.test.textEditor',(textEditor, edit , document) => {
        console.log(`您正在执行编辑命令`);
        console.log(textEditor , edit)
        console.log(document);
        const fileName = vscode.window.showInputBox({
            prompt: "请输入名称",
            value: "",
            placeHolder: "提示"
        })
        fileName.then( data => {
            // console.log(document.fileName);
            // let filepath = path.dirname( document.fileName)
            // vscode.window.showInformationMessage(`${filepath}`)
            data = `${path.dirname(document.fsPath)}/${data}`
            console.log(data);
            if(fs.existsSync(`${data}.json`)) openFile(`${data}.json`)
            else if(fs.existsSync(`${data}.js`)) openFile(`${data}.js`)
            else if(fs.existsSync(`${data}.ts`)) openFile(`${data}.ts`)
            else if(fs.existsSync(`${data}.css`)) openFile(`${data}.css`)
            else if(fs.existsSync(`${data}.html`)) openFile(`${data}.html`)
            else if(fs.existsSync(`${data}.vue`)) openFile(`${data}.vue`)
            else {
                vscode.window.showInformationMessage("暂无该文件")
            }
        })
        // vscode.window.showInformationMessage("您正在编辑文本")
    }),
    // 跳转到定义
    // 注册如何实现跳转到定义，第一个参数表示仅对json文件生效
    getProvider: vscode.languages.registerDefinitionProvider(['json'], {
        provideDefinition
    }),
    // 创建包含属于的文件名的目录
    getDirName: vscode.commands.registerCommand("extension.test.mkdir" , function(){
        const dirName = vscode.window.showInputBox({
            prompt: "输入文件名",
            value: "",
            placeHolder: "提示"
        })
        dirName.then( result => {
            console.log(result);
        })
    }),

    
}
let openFile = function(uri){
        vscode.window.showTextDocument(vscode.Uri.file(uri))
    }
module.exports = data