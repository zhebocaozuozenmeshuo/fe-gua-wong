// lesson4
// 自动测试
// var ensure = function(condition, message) {
//   if(!condition) {
//     console.log(message)
//   }
// }
//
// var ensureEqual = function(a, b, message) {
//   if(a != b) {
//     console.log(message, a, b)
//   }
// }
//
// var sum = function(numbers) {
//   //
// }
//
// var testSum = function() {
//   var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
//   var value = 45
//   ensure(value == sum(numbers), 'sum 错误')
//   ensure(1 == sum(1), '1 sum 错误')
// }

var __main = function() {
  console.log(fac(9))
  // testSum()
}

// break 跳出循环
// continue 跳过单次循环
// robust 鲁棒性 健壮性
// object(对象)
// object 是一个非常重要的存储数据的类型
// array 通过下标访问元素
// object 通过 key 键来访问元素
//
// 递归
var fac = function(n) {
  // 递归停止的条件
  if (n == 0) {
    return 1
  } else {
    return n * fac(n - 1)
  }
}

__main()
