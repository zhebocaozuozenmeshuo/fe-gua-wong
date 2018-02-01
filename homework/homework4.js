var log = function() {
  console.log.apply(console, arguments)
}
var ensure = function(conditions, message) {
  if (!conditions) {
    log(message)
  }
}

log('lesson4 homework load')

var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// 作业 1
// 10 分钟做不出就看提示
//
var find = function(s1, s2) {
  /*
  s1 s2 都是 string
  但 s2 的长度是 1

  返回 s2 在 s1 中的下标, 从 0 开始, 如果不存在则返回 -1
  */
  for (var i = 0; i < s1.length; i++) {
    var index = -1
    if (s1[i] === s2) {
      index = i
      break
    }
  }
  return index
}
ensure(25 == find(lower, 'z'), 'find a in 0')

/*
下面给出一个例子作为后面作业的参考
返回字符串的小写形式的函数
注意, 这里假设了 s 字符串全是大写字母
*/
// 这里是两个字符串, 包含了大写字母和小写字母
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var lowercase = function(s) {
  var result
  for (var i = 0; i < s.length; i++) {
    var index = find(upper, s[i])
    result += lower[index]
  }
  return result
}


/*
作业 3

实现 lowercase1
它能正确处理带 小写字母 的字符串
*/
var lowercase1 = function(s) {
  var result = ''
  for (var i = 0; i < s.length; i++) {
    var index = find(upper, s[i])
    if (index > -1) {
      result += lower[index]
    } else {
      result += s[i]
    }
  }
  return result
}

/*
作业 5
实现一个叫 凯撒加密 的加密算法, 描述如下
对于一个字符串, 整体移位, 就是加密
以右移 1 位为例
原始信息 'afz' 会被加密为 'bga'
实现 encode1 函数, 把明文加密成密码并返回
右移 1 位
*/
var shiftedChar = function(char, n) {
  /*
  返回字符 char 偏移 n 位后的字符
  */
  // 创建字母表
  var lower = 'abcdefghijklmnopqrstuvwxyz'
  var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var index = find(lower, char)
  if (index > -1) {
    var newIndex = (index + n + 26) % 26
    // log('lower char', index, char)
    return lower[newIndex]
  } else {
    index = find(upper, char)
    if (index > -1) {
      var newIndex = (index + n + 26) % 26
      // log('upper char', index, char)
      return upper[newIndex]
    } else {
      return char
    }
  }
}

var encode1 = function(s) {
  var result = ''
  for (var i = 0; i < s.length; i++) {
    var c1 = s[i]
    var c2 = shiftedChar(c1, 1)
    result += c2
  }
  return result
}

/*
作业 6
实现 decode1 函数, 把作业 5 加密的密码解密为明文并返回
*/
var decode1 = function(s) {
    var result = ''
    for (var i = 0; i < s.length; i++) {
      var c1 = s[i]
      var c2 = shiftedChar(c1, -1)
      result += c2
    }
    return result
}

/*
作业 7
实现 encode2
多了一个参数 shift 表示移的位数
*/

var encode2 = function(s, shift) {
  var result = ''
  for (var i = 0; i < s.length; i++) {
    var c1 = s[i]
    var c2 = shiftedChar(c1, shift)
    result += c2
  }
  return result
}

/*
作业 8
实现 decode2
多了一个参数 shift 表示移的位数
*/
var decode2 = function(s, shift) {
  var result = ''
  for (var i = 0; i < s.length; i++) {
    var c1 = s[i]
    var c2 = shiftedChar(c1, -shift)
    result += c2
  }
  return result
}

/*
作业 9
实现 encode3
多了一个参数 shift 表示移的位数
如果 s 中包含了不是字母的字符, 比如空格或者其他符号, 则对这个字符不做处理保留原样
*/
var encode3 = function(s, shift) {
    // 同上
}


/*
作业 10
实现 decode3
多了一个参数 shift 表示移的位数
如果 s 中包含了不是字母的字符, 比如空格或者其他符号, 则对这个字符不做处理保留原样
*/
var decode3 = function(s, shift) {
    // 同上
}

/*
作业 11
知乎有一个求助题, 破译密码的
链接在此
https://www.zhihu.com/question/28324597
这一看就是凯撒加密...
如果没思路, 可看本文件最后的提示
我把密码放在下面, 请解出原文
*/
var code = 'VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX'

var decode4 = function(code) {
  for (var i = 1; i < 26; i++) {
    var source = decode2(code, i)
    source = lowercase1(source)
    log('content may be :', i, ' ', source)
  }
}
decode4(code)
