var log = function() {
  console.log.apply(console, arguments)
}

var ensure = function(condition, message) {
  if (!condition) {
    log(message, ' 测试失败')
  }
}

var ensureEqual = function(a, b, message) {
  if(a != b) {
    log(`测试失败, ${a} 不等于 ${b}, ${message}`)
  }
}

log('lesson7 homework begin')
// 作业 1
/*
delimiter 是 string
array 是包含 string 的 array

把 array 中的元素用 delimiter 连接成一个字符串并返回
具体请看测试
*/
var join = function(delimiter, array) {
  var result = array[0]
  for (var i = 1; i < array.length; i++) {
    var a = array[i]
    result += (delimiter + a)
  }
  // log(result)
  return result
}

var test_join = function() {
    ensure(join('#', ['hello', 'gua']) == 'hello#gua', 'join 测试 1')
    ensure(join(' ', ['hello', 'gua']) == 'hello gua', 'join 测试 2')
    ensure(join('\n', ['multi', 'line', 'string']) == 'multi\nline\nstring', 'join 测试 3')
}
// test_join()

// 作业 2
/*
s 是 string
delimiter 是 string, 默认为空格 ' '

以 delimiter 为分隔符号, 返回一个 array
例如
split('1 2 3') 返回 ['1', '2', '3']
split('a=b&c=d', '&') 返回 ['a=b', 'c=d']
注意, 测试 array 是否相等得自己写一个函数用循环来跑

 0123456789
'a=bc=def'
[0, 1, 4, s.length]
(0, 1)
(1, 4)
(4, s.length)
*/
var split = function(s, delimiter=' ') {
  var result = []
  var space = delimiter.length
  var start = 0
  for (var i = 0; i < s.length; i++) {
    if (s.slice(i, i+space) === delimiter) {
        result.push(s.slice(start, i))
        start = i + space
    }
  }
  result.push(s.slice(start))
  log(result)
  return result
}

// split('a=b=def', '=')

// 作业 3
// 实现函数
/*
s old newString 都是 string
返回一个「将 s 中出现的所有 old 字符串替换为 new 字符串」的字符串
*/
// 很简单, 对吧?
var replaceAll = function(s, old, newString) {
  var s1 = split(s, old)
  var s2 = join(newString, s1)
  return s2
}

// replaceAll('1234', '1', '2')



// 作业 4
// 实现函数
/*
n 是 int
返回这样规律的字符串, 特殊情况不考虑
n       返回值
1       '1'
2       '121'
3       '12321'

1-n
(n-1)-1
*/
var str1 = function(n) {
  var s = ''
  for (var i = 1; i <= n; i++) {
    s += i
  }
  for (var i = n - 1; i > 0; i--) {
    s += i
  }
  return s
}

// log(str1(0))

// 作业 5
// 实现函数
/*
n 是 int
返回这样规律的字符串, 特殊情况不考虑
n       返回值
1       'A'
2       'ABA'
3       'ABCBA'
*/
// 用下标来取字符
var str2 = function(n) {
  var s = ''
  var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var index = str1(n)
  for (var i = 0; i < index.length; i++) {
    var c = index[i] - 1
    s += upper[c]
  }
  return s
}
// log(str2(3))


// 作业 6
// 实现加法口诀表
/*
返回这样格式的加法口诀表(没写全, 但是要返回完整的)
注意, 这只是我输入的内容
实际上你普通 log 出来是不会有回车的
[
    '1 + 1 = 2',
    '2 + 1 = 3  2 + 2 = 4',
    '3 + 1 = 4  3 + 2 = 5  3 + 3 = 6',
]
*/
var addLine = function(n) {
  var s = ''
  for (var i = 1; i <= n; i++) {
    s += `${n} + ${i} = ${n+i} `
  }
  return s
}
var addTable = function() {
  var table = []
  for (var i = 1; i <= 9; i++) {
    var line = addLine(i)
    table.push(line)
  }
  return table
}

// log(join('\n', addTable()))

// 作业 7
// 实现函数
/*
start end 都是 int

返回一个 array, 假设 start 为 1, end 为 5, 返回数据如下
[1, 2, 3, 4]
*/

var range1 = function(start, end) {
  var result = []
  for(var i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
// log(range1(1, 6))

// 作业 8
// 实现函数
/*
start end step 都是数字
step 是大于 0 的正整数

返回一个 array
假设 start=1, end=5, step=1 返回数据如下
[1, 2, 3, 4]
假设 start=0, end=6, step=2 返回数据如下
[0, 2, 4]
*/
var range2 = function(start, end, step) {
  var result = []
  for (var i = start; i < end; i+= step) {
    result.push(i)
  }
  return result
}
// log(range2(1, 5, 1))
// log(range2(0, 6, 2))

// 作业 9
// 实现函数
/*
start end step 都是数字

和 range2 一样, 但是要求支持负数 step
使用 while 循环
返回一个 array
假设 start=1, end=5, step=1 返回数据如下
[1, 2, 3, 4]
假设 start=6, end=0, step=-1 返回数据如下
[6, 5, 4, 3, 2, 1]
*/
var stepCondition = function(current, end, step) {
  if (step > 0) {
      return current < end
      // 下面两种是经常能看到的反例
      // if(current < end) {
      //     return true
      // } else {
      //     return false
      // }
      // return current < end ? true : false
  } else {
      return current > end
  }
}
var range3 = function(start, end, step) {
  var condition = start - end
  var result = []
  var i = start
  while (stepCondition(i, end, step)) {
    result.push(i)
    i += step
  }
  return result
}

// log(range3(1, 5, 1))
// log(range3(6, 0, -1))

// 作业 10
// 实现函数
/*
js 标准数学库有一个随机数函数
Math.random()
它返回 0 - 1 之间的小数

用它实现本函数, 返回 0 或 1
*/
var random01 = function() {
  var r = Math.random()
  r *= 10
  r = Math.floor(r)
  return r % 2
}
// log(random01())

// 作业 11
// 实现函数
/*
返回一个只包含了 0 1 的随机 array, 长度为 n
假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
[0, 0, 1, 0, 1]
*/
var randomLine01 = function(n) {
  var result = []
  for (var i = 0; i < n; i++) {
    var r = random01()
    result.push(r)
  }
  return result
}
// log(randomLine01(5))

// 作业 12
/*
返回以下格式的数据
假设 n 为 3, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
注意, 这只是一个 array, 并不是它显示的样子
注意, 这是一个 array 不是 string
[
    [0, 0, 1],
    [1, 0, 1],
    [0, 0, 0],
]
返回, 包含了 n 个『只包含 n 个「随机 0 1」的 array』的 array
*/
// 超烂！
// var randomSquare01 = function(n) {
//   var result = []
//   for (var i = 0; i < n; i++) {
//     var loop = []
//     for (var j = 0; j < n; j++) {
//       var r = random01()
//       loop.push(r)
//     }
//     result.push(loop)
//   }
//   return result
// }

var randomSquare01 = function(n) {
  var result = []
  for (var i = 0; i < n; i++) {
    var line = randomLine01(n)
    result.push(line)
  }
  return result
}
// log(randomSquare01(3))

// 作业 13
/*
返回一个只包含了 0 9 的随机 array, 长度为 n
假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
[0, 0, 9, 0, 9]

上上期有初学编程的同学用了一个很优雅的办法, 我就想不到
*/
// 额外的 2 种方法
// 1，取下标法
// var numbers = [0, 9, 7]
// var index = randomLine01(n)
// var n = numbers[index]
// 2，直接 * 9
// var n = random01() * 9
var random09 = function(n) {
  var line = randomLine01(n)
  for (var i = 0; i < line.length; i++) {
    line[i] *= 9
  }
  return line
}

// log(random09(3))

// 作业 14
/*
array 是一个只包含了 0 9 的 array
返回一个标记过的 array
** 注意, 使用一个新数组来存储结果, 不要直接修改老数组
复制数组用 array.slice(0) 实现

标记规则如下
对于下面这样的 array
[0, 0, 9, 0, 9]
标记后是这样
[0, 1, 9, 2, 9]

规则是, 0 会被设置为左右两边 9 的数量
*/













log('lesson7 homework end')
