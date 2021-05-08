const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
function provideDefinition(document , position , token){
    const fileName    = document.fileName;
    const word        = document.getText(document.getWordRangeAtPosition(position));
    const line        = document.lineAt(position);
    const workDir     = path.dirname(fileName);
    console.log(fileName);
    console.log(word);
    console.log(line);
    console.log(position);

    const json = document.getText();
    let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
    console.log(destPath);
    console.log(document);
    // 打开文件
    if (fs.existsSync(destPath)) {
        console.log("打开文件！");
        // 直接打开相应文件 ， 并移动到位置
        // vscode.window.showTextDocument(vscode.Uri.file(destPath) , position)

        // 加载文档 ， 并打开该文档
        vscode.workspace.openTextDocument(destPath).then( docu => {
            const options = {
                // 选中某个区域 ( 文件的开头 ~ 当前点击的位置 )
                selection: new vscode.Range(new vscode.Position( 0, 0) , new vscode.Position(position._line, position._character))
            }
            vscode.window.showTextDocument(vscode.Uri.file(docu.fileName), options)
        })


        // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
        // 返回 vscode.Location() 就表示当前光标所在单词支持跳转，并且跳转到对应`location`。
        // return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
    }
    else {
        vscode.window.showInformationMessage(
            "提示内容" , 
            "是" , 
            "否" , 
            "不再提示"
            ).then( result => {
                exec(`open 'https://haoji.me'`);
                vscode.window.showInformationMessage(`点击了${result}`)
            })
    }
}
module.exports = provideDefinition