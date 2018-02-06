var bindEvents = function() {
  // 创建 todo 的事件
  var button = e('#id-button-add')
  bindEvent(button, 'click', function(){
    log('click add')
    var input = e('#id-input-task')
    var task = input.value
    log('task ', task)
    var todo = todoNew(task)
    saveTodo(todo)
  })
  // 切换页面的按钮
  bindAll('.gua-tab', 'click', function(event){
    var button = event.target
    var page = button.dataset.page
    showPage(page)
    // 改变history state
    pushState(page)
  })
  // 浏览器后退前进的时候要切换页面
  window.addEventListener('popstate', function(e) {
    var state = e.state
    var pageName = state.page
    showPage(pageName)
  })
}

var pushState = function(className) {
  // 切换地址栏信息
  // todo-new todo-list
  var pageName = className.split('-')[1]
  var url = `/fe15/todo_spa.html#page=${pageName}`
  var state = {
    page: className,
  }
  history.pushState(state, 'title', url)
  // 手动设置 title
  document.title = pageName
}
var showPage = function(className) {
  // 删掉所有的 gua-page
  var pages = find(document, '.gua-page')
  for(var i = 0; i < pages.length; i++) {
    let page = pages[i]
    page.classList.add('gua-hide')
  }
  // 给 todo-new 删掉 gua-hide
  var selector = `.${className}`
  var todoNewDiv = e(selector)
  todoNewDiv.classList.remove('gua-hide')
  // 如果是 todo list 要刷新
  if(className === 'todo-list') {
    showTodoList()
  }
}


var initApp = function() {
  // 根据地址栏的参数来显示不同的页面
  var query = location.hash
  var [k, v] = query.slice(1).split('=')
  // 让 page 初始化为 list
  var page = 'list'
  // 设置一个 合法的 page 参数集合
  var validPages = ['list', 'new']
  if(k == 'page') {
    if (validPages.includes(v)) {
      page = v
    }
  }
  var pageName = `todo-${page}`
  showPage(pageName)
}
var __main = function() {
  bindEvents()
  // showTodoList()
  initApp()
}
__main()
