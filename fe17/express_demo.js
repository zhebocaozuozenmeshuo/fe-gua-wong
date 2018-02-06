const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const jsonParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json())

app.use(express.static('static'))

const log = function() {
  console.log.apply(console, arguments)
}

const sendHtml = function(path, response) {
  var fs = require('fs')
  var options = {
    encoding: 'utf-8'
  }
  fs.readFile(path, options, function(error, data){
      log(`读取的html文件${path}, 内容是`, data)
      response.send(data)
  })
}

app.get('/', function(request, response){
  let path = 'index.html'
  sendHtml(path, response)
})

app.get('/todo/all', function(request, response){
  var todos = [
    {
      id: 1,
      task: '喝茶',
    }
  ]
  var r = JSON.stringify(todos)
  response.send(r)
})

app.post('/todo/add', function(request, response){
  log('post todo add', request.body, typeof request.body)
  response.send('添加成功...')
})


const server = app.listen(8081, function(){
  let host = server.address().address
  let port = server.address().port
  log(`服务器已经在 ${port} 端口启动了监听服务\n 请在空中旋转720度然后用电饭煲打开 http://127.0.0.1:${port}`)
  })



// var ajax = function(method, path, data, responseCallbackMethd) {
//     var r = new XMLHttpRequest()
//     r.open(method, path, true)
//     r.setRequestHeader('Content-Type', 'application/json')
//     r.onreadystatechange = function() {
//       if(r.readyState == 4) {
//         responseCallbackMethd(r)
//       }
//     }
//     r.send(data)
// }
// {
//   "task": "iigw"
// }
// ajax('POST', '/todo/add', '{"task": "ii gw"}', function(r){console.log(r)})
