const fs = require('fs')
const _saveJSON = function(path, jsonStr) {
  // 这个函数用来把传过来的字符串保存到文件中

  // 第二个参数是 null 不用管
  // 第三个参数是缩进层次
  const s = JSON.stringify(jsonStr, null, 2)
  fs.writeFile(path, s, function(error) {
    if(error != null){
      _log('write file down')
    } else {
      _log('spider nb')
    }
  })
}

const _log = function() {
  console.log.apply(console, arguments)
}

/*
 通过 exports 制作自己的模块
*/
exports.saveJSON = _saveJSON
exports.log = _log
