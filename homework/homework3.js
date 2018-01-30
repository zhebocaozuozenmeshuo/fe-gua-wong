var log = function() {
    console.log.apply(console, arguments)
}

log('lesson 3 homework ')

var ensure = function(condition, message) {
    if(!condition) {
        log(message)
    }
}

// 求数组的和
var sum = function(array) {
    var sum = 0
    for (var i = 0; i < array.length; i++) {
        sum += array[i]
    }
    return sum
}
var a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
ensure(sum(a1) === 55, 'sum wrong')

// 作业 1
// 参数是一个只包含数字的 array
// 求 array 的乘积
var product = function(array) {
    var s = array[0]
    for (var i = 1; i < array.length; i++) {
        s *= array[i]
    }
    return s
}
var a2 = [1, 2, 3,]
ensure(product(a2) === 6, 'product wrong')

// 作业 2
// 返回一个数的绝对值
var abs = function(n) {
    if (n < 0) {
        return -n
    }
    return n
}
var a3 = -19
var a4 = 20
ensure(abs(a3) === 19, 'abs1 wrong')
ensure(abs(a4) === 20, 'abs2 wrong')

// 作业 3
// 参数是一个只包含数字的 array
// 求平均值
// var average = function(array) {
//     var s = 0
//     for (var i = 0; i < array.length; i++) {
//         s += array[i]
//     }
//     return s / array.length
// }
var average = function(array) {
    var n = array.length
    return sum(array) / n
}
var a5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
ensure(average(a5) === 5.5, 'average wrong')

// 作业 4
// 参数是一个只包含数字的 array
// 求 array 中最小的数字
var min = function(array) {
    var m = array[0]
    for (var i = 1; i < array.length; i++) {
        var n = array[i]
        if (n < m) {
            m = n
        }
    }
    return m
}

var a6 = [2, 1, 4]
var a7 = [99, 101, 103]
ensure(min(a6) === 1, 'min1 wrong')
ensure(min(a7) === 99, 'min2 wrong')

// 作业 5
/*
参数是一个数字 n
返回以下序列的结果
1 - 2 + 3 - 4 + 5 ... n
*/
var sum1 = function(n) {
    var s = 0
    //
    for (var i = 1; i <= n; i++) {
        if(i % 2 == 0) {
            s -= i
        } else {
            s += i
        }
    }
    console.log(s)
    return s
}
// n = 5 时 1 - 2 + 3 - 4 + 5 = 3
console.log(sum1(5))

// 作业 6
/*
参数是一个数字 n
返回以下序列的结果
1 + 2 - 3 + 4 - ... n
*/
var sum2 = function(n) {
    var s = 1
    for (var i = 2; i <= n; i++) {
        if(i % 2 == 0) {
            s += i
        } else {
            s -= i
        }
    }
    return s
}
// 当n = 5 时， 1 + 2 - 3 + 4 -5 = -1
log(sum2(5))

// 作业 7
/*
实现 fac 函数
接受一个参数 n
返回 n 的阶乘, 1 * 2 * 3 * ... * n
*/
var fac = function(n) {
    if(n === 1) {
        return 1
    }
    return n * fac(n-1)
}
// 3! = 6
// 10! = 3628800
log('3!:', fac(3))
log('10!:', fac(10))

/*
注意 下面几题中的参数 op 是 operator(操作符) 的缩写

作业 8
实现 apply 函数
参数如下
op 是 string 类型, 值是 '+' '-' '*' '/' 其中之一
a b 分别是 2 个数字
根据 op 对 a b 运算并返回结果(加减乘除)
*/
var apply = function(op, a, b) {
    log(op, a, b)
    if(op === '+') {
        return a + b
    }
    if(op === '-') {
        return a - b
    }
    if(op === '*') {
        return a * b
    }
    if(op === '/') {
        return a / b
    }
}
log('1+2=', apply('+', 1, 2))
log('1-2=', apply('-', 1, 2))

/*
作业 9
实现 applyList 函数
op 是 '+' '-' '*' '/' 其中之一
oprands 是一个只包含数字的 array
根据 op 对 oprands 中的元素进行运算并返回结果
例如, 下面的调用返回 -4
var n = applyList('-', [3, 4, 2, 1])
log(n)
// 结果是 -4, 用第一个数字减去所有的数字
*/
var a8 = [3, 4, 2, 1]

var applyList = function(op, oprands) {
    var result = oprands[0]
    for (var i = 1; i < oprands.length; i++) {
        //
        var n = oprands[i]
        result = apply(op, result, n)
    }
    return result
}
log('applyList ', applyList('-', a8))

/*
作业 10
实现 applyCompare 函数
参数如下
expression 是一个 array(数组), 包含了 3 个元素
第一个元素是 op, 值是 '>' '<' '==' 其中之一
剩下两个元素分别是 2 个数字
根据 op 对数字运算并返回结果(结果是 true 或者 false)
*/
var applyCompare = function(expression) {
    var [op, a, b] = expression
    if(op === '>') {
        return a > b
    } else if(op === '<') {
        return a < b
    } else if (op === '==') {
        return a == b
    }
}
log('applyCompare:', applyCompare(['>', 2, 3]))

/*
注意
下面这题做不出来没关系

作业 11
实现 applyOps 函数
参数如下
expression 是一个 array
expression 中第一个元素是上面几题的 op, 剩下的元素是和 op 对应的值
根据 expression 运算并返回结果
*/
var applyOps = function(expression) {
    var [op, ...rest] = expression
    if(op === '+' || op === '-' || op === '*' || op === '/'  ) {
        return apply(op, ...rest)
    } else {
        return applyCompare(expression)
    }
}
var a10 = ['==', 1, 2]
log('applyOPs: ', applyOps(a10))

console.log('fe3 作业 结束')
console.log('20180130 打卡')













//
