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

/************************************************************* */
var addTodo = function(task) {
    var data = {
        'qq': '354929394',
        task
    }
    todo = JSON.stringify(todo)
    ajax('POST', '/add', todo, function(r) {
         var t = JSON.parse(r.response)  
        console.log(t)
    })
}

/************************************************************* */

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