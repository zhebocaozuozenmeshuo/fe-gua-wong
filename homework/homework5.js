var log = function() {
  console.log.apply(console, arguments)
}

var ensure = function(condition, message) {
  if (!condition) {
    log(message, '测试失败')
  }
}

log('lesson5 homework start')



// 作业 1
// 10 分钟做不出就看提示
//

    /*
    n 是 int 类型
    width 是 int 类型

    把 n 的位数变成 width 这么长，并在右对齐，不足部分用 0 补足并返回
    具体请看测试, 注意, 返回的是 string 类型

    返回 string 类型
    */
  var zfill = function(n, width) {
    var str = String(n)
    var len = str.length
    var numZero = width - len
    // var result = ''
    // for (var i = 0; i < numZero; i++) {
    //   result += '0'
    // }
    // result += str
    // return result
    var zeros = ''
    if (numZero > 0) {
      for (var i = 0; i < numZero; i++) {
        zeros += '0'
      }
      str = zeros + str
    }
    return str
  }

  // 测试函数
  var test_zfill = function() {
      ensure(zfill(1, 4) === '0001', 'zfill 测试 1')
      ensure(zfill(23, 4) === '0023', 'zfill 测试 2')
      ensure(zfill(12345, 4) === '12345', 'zfill 测试 3')
      ensure(zfill(169, 5) === '00169', 'zfill 测试 4')
  }
  test_zfill()

  // 作业 2
  // 10 分钟做不出就看提示
  //
  // 注意, 这是一个新的知识点, 叫 默认参数
  // fillchar 这个参数如果你不提供, 它的值默认就是 ' '
  // 语法就是这样

      /*
      s 是 string
      width 是 int
      fillchar 是 长度为 1 的字符串, 默认为空格 ' '

      如果 s 长度小于 width, 则在末尾用 fillchar 填充并返回
      否则, 原样返回, 不做额外处理

      返回 string 类型
      */
var ljust = function(s, width, fillchar=' ') {
  if (s.length < width) {
    var len = width - s.length
    for (var i = 0; i < len; i++) {
      s += fillchar
    }
  }
  return s
}

var test_ljust = function() {
    ensure(ljust('gua', 5) === 'gua  ', 'ljust 测试 1')
    ensure(ljust('guagua', 5) === 'guagua', 'ljust 测试 2')
    ensure(ljust('gua', 5, '*') === 'gua**', 'ljust 测试 3')
}
test_ljust()

// 作业 3
// 10 分钟做不出就看提示
//

    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '

    如果 s 长度小于 width, 则在开头用 fillchar 填充并返回

    返回 string 类型
    */
var rjust = function(s, width, fillchar=' ') {
  if (s.length < width) {
    var len = width - s.length
    for (var i = 0; i < len; i++) {
      s = fillchar + s
    }
  }
  return s
}

var test_rjust = function() {
    ensure(rjust('gua', 5) === '  gua', 'rjust 测试 1')
    ensure(rjust('guagua', 5) === 'guagua', 'rjust 测试 2')
    ensure(rjust('gua', 5, '*') === '**gua', 'rjust 测试 3')
}
test_rjust()

// 作业 4
// 10 分钟做不出就看提示
//

    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '

    如果 s 长度小于 width, 则在两边用 fillchar 填充并返回
    如果 s.length 和 width 互为奇偶, 则无法平均分配两边的 fillchar
    这种情况下, 让左边的 fillchar 数量小于右边

    返回 string 类型
    */

var center = function(s, width, fillchar=' ') {
  var str = String(s)
  var len = str.length
  var numFillChar = width - len
  var numL, numR
  if (numFillChar > 0) {
    if(numFillChar % 2 === 0) {
      numL = numFillChar / 2 + len
      numR = width
    } else {
      numL = numFillChar / 2 + len + 0.5
      numR = width
    }
    str = ljust(str, numL, fillchar)
    str = rjust(str, numR, fillchar)
  }
  // log('r xxx', str)
  return str
}

var test_center = function() {
    ensure(center('gua', 5) === ' gua ', 'center 测试 1')
    ensure(center('gua', 5, '*') === '*gua*', 'center 测试 2')
    ensure(center('gw', 5) === ' gw  ', 'center 测试 3')
    ensure(center('gua', 6) === ' gua  ', 'center 测试 4')
}
test_center()

// 作业 5
// 10 分钟做不出就看提示
// 注意, 看上面的资料, 介绍了一个 includes 函数
//

    /*
    s 是 string
    检查 s 中是否只包含空格

    返回 bool, 如果 s 中包含的只有空格则返回 true, 否则返回 false
    */
var is_space = function(s) {
  s = String(s)
  if (s.length === 0) {
    return false
  }
  for (var i = 0; i < s.length; i++) {
    if(s[i] === ' ') {
      continue
    }
    return false
  }
  return true
}
var test_is_space = function() {
    ensure(is_space(' '), 'space 测试 1')
    ensure(is_space('   '), 'space 测试 2')
    ensure(!is_space(''), 'space 测试 3')
    ensure(!is_space('gua '), 'space 测试 4')
}
test_is_space()

// 作业 6
// 10 分钟做不出就看提示
//

    /*
    s 是字符串
    检查 s 中是否只包含数字
    返回: bool, 如果 s 中包含的只有数字则返回 true, 否则返回 false
    */

var is_digit = function(s) {
  var digit = '0123456789'
  var str = String(s)
  if(str.length === 0) {
    return false
  }
  for (var i = 0; i < s.length; i++) {
    if (digit.includes(s[i])) {
        continue
    }
    return false
  }
  return true
}

var test_is_digit = function() {
    ensure(is_digit('123'), 'is_digit 测试 1')
    ensure(is_digit('0'), 'is_digit 测试 2')
    ensure(!is_digit('  '), 'is_digit 测试 3')
    ensure(!is_digit('1.1'), 'is_digit 测试 4')
    ensure(!is_digit('gua'), 'is_digit 测试 5')
}
test_is_digit()



















log('lesson5 homework end')
