var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var ajax = function(method, path, data, responseCallbackMethd) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.onreadystatechange = function() {
      if(r.readyState == 4) {
        responseCallbackMethd(r)
      }
    }
    r.send(data) 
}

// 第一步 向页面中添加输入框和提交按钮
var init = function() {
    var t = `
        <input id="id-input-task">
        <button id="id-button-add">add todo</button>
    `
    appendHtml(e('#id-div-container'), t)
}
var baseUrl = ''
// 第二步 载入所有 todo
var loadTodos = function() {
    var method = 'GET'
    var path = '/all'
    var url = baseUrl + path
    ajax(method, url, '', function(r){
        var todos = JSON.parse(r.response)
        // log(todos)
        insertTodos(todos)
    })
}

var todoTemplate = function(todo) {
    var task = todo.task
    var id = todo.id
    var t = `
        <div id=${id}>
            <button class="button-delete">删除</button>
            <button class="button-update">更新</button>
            <span id=task-${id}>
                ${task}
            </span>
        </div>
    `
    return t
}

// 第三步 显示所有 todo
var insertTodos = function(todos) {
    var container = e('#id-div-container')
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        var t = todoTemplate(todo)
        appendHtml(container, t)        
    }
}

var deleteTodo = function(todoId) {
    var data = {
        "id": todoId
    }
    data = JSON.stringify(data)
    ajax('POST', '/delete', data, function(r) {
      var todo = JSON.parse(r.response)
      log(todo)
    })
}

// 绑带删除按钮的事件
// 写出删除按钮， 需要 todo_id
// 在事件中调用删除函数， 需要得到 todo_id 并传给删除函数
var bindEventDelete = function() {
    var container = e('#id-div-container')
    container.addEventListener('click', function(event) {
        var target = event.target
        if(target.classList.contains('button-delete')){
            // 这是删除按钮
            // 获取 todo id
            var todoId = target.parentElement.id
            deleteTodo(todoId)
            // 删除 todo 这个 div，暂时不关心服务器那边是否删除成功
            target.parentElement.remove()
        }
    })    
}

/************************************************************* */
var addTodo = function(todo) {
    todo = JSON.stringify(todo)
    ajax('POST', '/add', todo, function(r) {
         var t = JSON.parse(r.response)  
        console.log(t)
    })
}

var bindEventAdd = function() {
    var addButton = e('#id-button-add')
    addButton.addEventListener('click', function(event){
        var task = e('#id-input-task').value
        if(task==='') {
            alert('填点东西啊 同学')
            return
        }
        var data = {
            'qq': '354929394',
            task
        }
        addTodo(data)
        // 添加 todo 这个 div 暂时先不管服务器那边是否添加成功
        var container = e('#id-div-container')
        var t = todoTemplate(data)
        appendHtml(container, t)    
    })
}

/************************************************************* */

// 第八步 添加 css....
var addCss = function() {
    var style = `
        <style>
            div {
                outline: red 1px dashed;
            }
        </style>
    `
    var head = e('head')
    appendHtml(head, style)
}

// 第七步 点击更新按钮要....
//      向 div 中添加两个元素 input 和 提交按钮
//      给提交按钮绑定事件
//      点击提交按钮的时候 发送 ajax 请求到服务器
var bindEventUpdate = function() {
    var container = e('#id-div-container')
    container.addEventListener('click', function(event) {
        var target = event.target
        if(target.classList.contains('button-update')){
            // 这是更新按钮
            log('点到了更新')
            // 获取 todo id
            var todoId = target.parentElement.id
            var t = `
                <input id=update-${todoId}>
                <button class=button-submit>提交</button>
            `
            appendHtml(target.parentElement, t)
            // deleteTodo(todoId)
            // // 删除 todo 这个 div，暂时不关心服务器那边是否删除成功
            // target.parentElement.remove()
        }
    })    
}
var updateTodo = function(todoId, task) {
    var data = {
        "id": todoId,
        task
    }
    data = JSON.stringify(data)
    ajax('POST', '/update', data, function(r) {
        var todo = JSON.parse(r.response)  
        console.log(todo)
    })
}
var bindEventSubmit = function() {
    var container = e('#id-div-container')
    container.addEventListener('click', function(event) {
        var target = event.target
        if(target.classList.contains('button-submit')){
            // 这是提交按钮
            log('点到了提交')
            // 获取 todo id
            var todoId = target.parentElement.id
            // 1.得到input 的值
            // 2.input 的 id 是 update-<id>
            var inputId = 'update-' +todoId
            var selector = '#' + inputId
            var task = e(selector).value
            // 发送更新请求
            updateTodo(todoId, task)
            // 更新页面上的 todo task
            var taskId = 'task-' +todoId
            var selector = '#' + taskId
            e(selector).innerHTML = task
        }
    })    
}

var bindEvents = function() {
    bindEventDelete()
    bindEventUpdate()
    // 给提交按钮绑定事件
    bindEventSubmit()


    bindEventAdd()
    
}

var __main = function() {
    addCss()
    init()
    loadTodos()
    bindEvents()
}

__main()