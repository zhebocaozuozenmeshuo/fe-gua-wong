var log = function() {
  console.log.apply(console, arguments)
}
/*
作业 11
知乎有一个求助题, 破译密码的
链接在此
https://www.zhihu.com/question/28324597
这一看就是凯撒加密...
如果没思路, 可看本文件最后的提示
我把密码放在下面, 请解出原文
可以帮忙破译一个密码吗？VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW修改
密码正文：

VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX

谢谢唉。。。。真的不是秀恩爱额。
*/
var code1 = 'VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX'
var code = 'ZUO YOU WEI NAN, HUAN DE HUAN SHI'

var decodeAllCondition = function(code) {
  for (var i = 0; i < 26; i++) {
    var result = ADecode(code, i)
    log(result)
  }
}
var ADecode = function(code, shift) {
  var source = ''
  var s = code
  for (var i = 0; i < s.length; i++) {
    var c1 = s[i]
    source += decodeALetter(c1, shift)
  }
  return source
}
var decodeALetter = function(char, shift) {
  var upper = `ABCDEFGHIJKLMNOPQRSTUVWXYZA`
  var lower = `abcdefghijklmnopqrstuvwxyza`
  var index = find(upper, char)
  if (index > -1) {
    var newIndex = (index + shift + 26) % 26
    return upper[newIndex]
  } else {
    index = find(lower, char)
    if (index > -1) {
      var newIndex = (index + shift + 26) % 26
      return lower[newIndex]
    } else {
      return char
    }
  }
}
var find = function(s1, s2) {
  var index = -1
  for (var i = 0; i < s1.length; i++) {
    var c = s1[i]
    if (c === s2) {
      index = i
      break
    }
  }
  return index
}

decodeAllCondition(code)
