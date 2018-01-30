var log = function() {
    console.log.apply(console, arguments)
}

var ensure = function(condition, message) {
  if(!condition) {
    console.log(message)
  }
}

log('fe8 js')

// lesson 7

// 作业2
// 实现函数
var split = function(s, delimiter= ' ') {
    // s 是一个 nstring
    // delimiter 是 string, 默认是空格 ‘ ’
    // 以 delimiter 为分隔符合， 返回一个array 数组
    // 例如
    // split('1 2 3') 返回 ['1', '2', '3']
    // split('a=b&c=d', '&') 返回 ['a=b', 'c=d']
    // 注意， 侧与 array 是否相等得自己写一个循环
}




// 作业1
// 实现函数
var join = function(delimiter, array) {
    // delimiter (分隔符) 是 string
    // array 是包含 string 的array
    // 把 array 中的元素用 delimiter 连接成一个字符串并返回

    var s = array[0]
    for (var i = 1; i < array.length; i++) {
        var a = array[i]
        s += (delimiter + a)
    }
    return s
}

var test_join = function() {
    ensure(join('#', ['hello', 'gua']) == 'hello#gua', 'join 测试 1')
    ensure(join(' ', ['hello', 'gua']) == 'hello gua', 'join 测试 2')
    ensure(join('\n', ['mutil', 'line', 'string']) == 'mutil\nline\nstring', 'join 测试 3')
}

// test_join()
