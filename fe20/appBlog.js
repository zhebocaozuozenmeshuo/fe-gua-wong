// 引入 express 并创建一个 express 实例赋值给 app
const express = require('express')
const app = express()
const bodyParser =  require('body-parser')
const fs = require('fs')

const log = function() {
  console.log.apply(console, arguments)
}

app.use(bodyParser.json())

// 配置静态文件目录
app.use(express.static('static'))

// 加载 blog.js 模块
const blog = require('./model/blog')
const comment = require('./model/comment')

var sendHtml = function(path, response) {
  var options = {
    encoding: 'utf-8'
  }
  path = `template/${path}`
  fs.readFile(path, options, function(err, data){
      log(`读取的页面是 ${path} , 内容是:`, data)
      response.send(data)
  })
}

app.get('/', function(request, response){
  const path = 'blog_index.html'
  sendHtml(path, response)
})

app.get('/blog', function(request, response){
  console.log('query', request.query)
  let path = 'blog_detail.html'
  sendHtml(path, response)
})

// ***
app.get('/api/blog/all', function(request, response){
  // log(typeof blog, blog, Object.keys(blog))
  // 加载数据并返回
  const blogs = blog.all()
  var r = JSON.stringify(blogs)
  response.send(r)
})

app.post('/api/blog/add', function(request, response) {
  let form = request.body
  let b = blog.new(form)
  let r = JSON.stringify(b)
  response.send(r)
})

app.post('/api/comment/add', function(request, response) {
  let form = request.body
  let b = comment.new(form)
  let r = JSON.stringify(b)
  response.send(r)
})

var server = app.listen(8081, function(){
  var port = server.address().port
  log(`服务器已经在 ${port} 端口启动了监听服务\n 请在空中旋转720度然后用电饭煲打开 http://localhost:${port}`)
})
