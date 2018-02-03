var Api = function() {
    this.baseUrl = ''
}

Api.prototype.ajax = function(method, path, data, responseCallback) {
    var r = new XMLHttpRequest()
    var url = this.baseUrl + path
    r.open(method, url, true)
    r.onreadystatechange = function() {
      if(r.readyState == 4) {
        var data = JSON.parse(r.response)
        responseCallback(data)
      }
    }
    data = JSON.stringify(data)
    r.send(data) 
}

Api.prototype.addTodo = function(task, responseCallback) {
    var path = '/add'
    var data = {
        'qq': '354929394',
        task
    }
    this.ajax('POST', path, data, responseCallback)
}

Api.prototype.deleteTodo = function(todoId, responseCallback) {
    var path = '/delete'
    var data = {
        "id": todoId
    }
    this.ajax('POST', path, data, responseCallback)
}

Api.prototype.updateTodo = function(todoId, task, responseCallback) {
    var path = '/update'
    var data = {
        "id": todoId,
        task
    }
    this.ajax('POST', path, data, responseCallback)
}

Api.prototype.loadTodos = function(responseCallback) {
    var path = '/all'
    this.ajax('GET', path, '', responseCallback)
}

var api = new Api()
// api.loadTodos(function(r){
//     console.log(r)
// })
// api.deleteTodo('xk1f', function(r){
//     console.log(r)
// })
// api.addTodo('api 调用 todo', function(r){
//     console.log(r)
// })
// api.updateTodo('6mme', 'api 修改 todo', function(r){
//     console.log(r)
// })