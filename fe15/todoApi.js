// todo api
// 创建 todo object
var todoNew = function(task) {
  var t = {
    task,
    done: false,
  }
  return t
}
// 保存一个 todoList
var saveTodos = function(todoList) {
  localStorage.todos = JSON.stringify(todoList)
}
// 保存 todo
var saveTodo = function(todo) {
  var todoList = loadTodos()
  todoList.push(todo)
  saveTodos(todoList)
}
// 返回存储的所有 todo
var loadTodos = function() {
  var todoStr = localStorage.todos
  if (todoStr == undefined) {
    todoStr = '[]'
  }
  var todoList = JSON.parse(todoStr)
  return todoList
}
