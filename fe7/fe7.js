var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

localStorage.name = 'gua'

// array to string 序列化
// string to array 反序列化
// var s = JSON.stringify([1, 2, 3, 4])
// log('序列化后的字符串', typeof s, s)
// var m = JSON.parse(s)
// log('反序列化后的数组', typeof m, m)

// 定义一个函数， 用于把 数组 写入 localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}

// 定义一个函数, 读取 localStorage 中的数据并解析返回
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

// 定义一个函数， 把页面上所有的 todo 用 save 保存
var saveTodos = function() {
    // 1 选出所有的 content 标签
    // 2 取出 todo
    // 3 添加到一个数组中
    // 4 保存数组
    var contents = document.querySelectorAll('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done,
            content: c.innerHTML,
        }
        // 添加到数组中
        todos.push(todo)
    }
    // 保存数组
    save(todos)
}

var loadTodos = function() {
    var todos = load()
    log('load todos', todos)
    // 添加到页面中
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo.content, todo.done)
    }
}
var insertTodo = function(todo, done) {
    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo, done)
    todoContainer.insertAdjacentHTML('beforeend', t)
}

var addButton = e('#id-button-add')
addButton.addEventListener('click', function() {
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    // 添加到 container 中
    insertTodo(todo, false)
    // 添加之后保存 todos
    saveTodos()
})
var templateTodo = function(todo, done) {
    var status = ''
    if (done) {
        status = 'done'
    }
    return `
        <div class="todo-cell ${status}">
            <button class="todo-done">完成</button>
            <button class="todo-delete">删除</button>
            <span class="todo-content" contenteditable="true">${todo}</span>
        </div>
    `
}
// 事件委托
var todoContainer = e('#id-div-container')
todoContainer.addEventListener('click', function(event) {
    log('container click', event, event.target)
    var target = event.target
    if (target.classList.contains('todo-done')) {
        log('done')
        //
        var todoDiv = target.parentElement
        log('todoDiv: ', todoDiv)
        toggleClass(todoDiv, 'done')
        // 改变 todo 完成状态之后保存 todos
        saveTodos()
    } else if (target.classList.contains('todo-delete')) {
        log('delete')
        //
        var todoDiv = target.parentElement
        todoDiv.remove()
        // 删除之后保存 todos
        saveTodos()
    }
})

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
loadTodos()



//
// log('number, string, object, boolean')
//
// a = 10
// b = true
// c = 'gua'
// log('type a', typeof a)
// log('type b', typeof b)
// log('type c', typeof c)
//
// log(5./2)
// log(2./5)

// 数组去重
// var square = function(n) {
//     return n*n
// }
// var array = [-1.1, 2.2, 3.3]
// var process = function(array, processor) {
//     var l = []
//     for (var i = 0; i < array.length; i++) {
//         var a = array[i]
//         var element = processor(a)
//         l.push(element)
//     }
//     return l
// }

// var d = new Date()
// log(d)
// // 年份 2018
// log(d.getFullYear())
// // 月份 0-11
// log(d.getMonth())
// // 日期 1-31
// log(d.getDate())
// // 小时 0-23
// log(d.getHours())
// // 分钟 0-59
// log(d.getMinutes())
// // 秒
// log(d.getSeconds())
// // 毫秒 0-999
// log(d.getMilliseconds())
// // 星期几， 0-6
// log(d.getDay())

var now = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate()
    var hour = d.getHours()
    var minute = d.getMinutes()
    var second = d.getSeconds()
    
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}
log(now())
