// lesson19
// 数据结构与算法分析
// 算法就是得到一个结果的步骤

var log = function() {
  console.log.apply(console, arguments)
}

// 队列结构
// 主要有 2 个操作
// enqueue dequeue
var Queue = function() {
  // data 是存储元素的数组
  this.data = []
}

// 入队
Queue.prototype.enqueue = function(element) {
  this.data.push(element)
}

// 出队
Queue.prototype.dequeue = function(element) {
  // splice 第一个参数是起始坐标 第二个参数是个数
  return this.data.splice(0, 1)
}

// 队列长度
Queue.prototype.length = function() {
  return this.data.length
}

// 清空队列
Queue.prototype.empty = function() {
  this.data = []
}

// var q = new Queue()
// q.enqueue(1)
// q.enqueue(2)
// q.enqueue(3)
// log('length', q.length())
// log(q.dequeue())
// q.enqueue(4)
// log(q.dequeue())
// log(q.dequeue())


// Stack 栈
// 常见的 3 个操作
// push pop top
//
var Stack = function() {
  this.data = []
}

// push 添加一个元素
Stack.prototype.push = function(e) {
  this.data.push(e)
}

// pop 删除并返回最新添加的元素
Stack.prototype.pop = function() {
  var index = this.data.length - 1
  return this.data.splice(index, 1)
}

// top
Stack.prototype.top = function() {
  var index = this.data.length - 1
  return this.data[index]
}

// var s = new Stack()
// s.push('hello')
// s.push('wong')
// log(s.top())
// log(s.pop())
// log(s.pop())

// var str = 'wong'
// for (var i = 0; i < str.length; i++) {
//   var c = str[i]
//   s.push(c)
// }
// var str1 = ''
// for (var i = 0; i < str.length; i++) {
//   str1 += s.pop()
// }
// log('str1', str1)

// 链表
// LinkedList
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
// [21, 7, 39, 78, 51, 86, 33, 18, 22, 100]
// 时间、空间复杂度
// 复杂度是对一个操作的大致估计
// 复杂度从小到大依次如下
/*
五种常见时间复杂的
O(1)
O(logN) 比如二分搜索 常用于有序列表的查找
O(n) 从头到尾的遍历， 比如给数组中的每个数组加 1
O(NlogN)
O(N的平方)

空间复杂度
O(1)
O(n)
*/

// 链表实现
//
var Node = function(e) {
  this.element = e
  this.next = null
}

// var n1 = new Node(1)
// var n2 = new Node(2)
// var n3 = new Node(3)
// n1.next = n2
// n2.next = n3
//
// var n = n1
// while(n != null) {
//   log('遍历链表', n.element)
//   n = n.next
// }

var LinkedList = function() {
  this.head = new Node()
  this._length = 0
}

// 在链表末尾增加一个元素
LinkedList.prototype.append = function(e) {
  var node = new Node(e)
  var n = this.head
  while(n.next != null) {
    n = n.next
  }
  n.next = node
  this._length += 1
}

// 返回一个元素的 index
LinkedList.prototype.indexOf = function(e) {
  var index = -1
  var n = this.head
  var i = 0
  while(n.next != null) {
    n = n.next
    if(e === n.element) {
      index = i
      break
    }
    i++
  }
  return index
}

// 返回链表的长度
LinkedList.prototype.length = function() {
  return this._length
}

LinkedList.prototype.log = function() {
  var n = this.head.next
  log('遍历链表')
  while(n != null) {
    log(' > ', n.element)
    n = n.next
  }
}

var list = new LinkedList()
list.append('hello')
list.append('gua')
list.log()
log(list.indexOf('hello'))
log(list.length())

//
/*
  封装 继承 多态

*/
// 快速排序
/*
hash table 哈希表(散列表)
tree  树
set   集合
graph 图

*/
