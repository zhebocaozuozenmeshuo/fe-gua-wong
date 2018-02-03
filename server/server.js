const http = require('http')
const url = require('url')
const fs = require('fs')
const log = function() {
  console.log.apply(console, arguments)
}
const now = function() {
  var d = new Date()
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  var hour = d.getHours()
  var minute = d.getMinutes()
  var second = d.getSeconds()
  
  return `${year}${month}${day}${hour}${minute}${second}`
}
const taskId = function() {
  return Math.random().toString(36).substr(2, 4)
}

let port = process.argv[2]
if (!port) {
  log(` 请指定端口行不行?\n node server.js 8888 很难么?`)
  process.exit(1)
}

var server = http.createServer(function(request, response){
  let parsedUrl = url.parse(request.url, true)
  let pathWithQuery = request.url
  let queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  // log('********recieved a request********')
  // log('parsedUrl:', parsedUrl, 'pathWithQuery:', pathWithQuery, 'queryString', queryString)
  // log('path:', path, 'query:', query, 'method', method)
  // log('********end request********')
  /*************emms, 上面的不懂也没关系啊...**************************************/
  log(`宏坤说: 你的带参数请求路径为 \n ${pathWithQuery}`)
  if (path === '/') {
    let string = fs.readFileSync('./server/index.html', 'utf8')
    let cookies = request.headers.cookie.split('; ')
    let hash = {}
    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split('=')
      let key = parts[0]
      let value = parts[1]
      hash[key] = value
    }
    let email = hash.sign_in_email
    let users = fs.readFileSync('./server/db/users', 'utf8')
    users = JSON.parse(users)
    let foundUser
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if(user.email === email) {
        foundUser = user
        break
      }
    }
    if (foundUser) {
      string = string.replace('__password__', foundUser.password)
    } else {
      string = string.replace('__password__', '不知道')
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'GET') {
    let string = fs.readFileSync('./server/sign_up.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'POST') {
    readBody(request).then((body)=>{
      log('signUpBody', body)
      let strings = body.split('&')
      // console.log(strings)
      let hash = {}
      strings.forEach((string)=>{
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let{email, password, password_confirmation} = hash
      if(email.indexOf('@') === -1) {
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(`
          {
            "errors": {
              "email": "invalid"
            }
          }
          `)
      } else if (password != password_confirmation) {
        response.statusCode = 400
        response.write('password not match')
      } else {
        var users = fs.readFileSync('./server/db/users', 'utf8')
        try {
          users = JSON.parse(users)
        } catch(exception) {
          users = []
        }
        let inUse = false
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if(user.email === email) {
            inUse = true
            break
          }
        }
        if(inUse) {
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json;charset=utf-8')
          response.write(`
            {
              "errors": {
                "email": "inUse"
              }
            }
          `)
        }  else {
          users.push({email: email, password: password})
          var usersString = JSON.stringify(users)
          fs.writeFileSync('./server/db/users', usersString)
          response.statusCode = 200
        } 
      }
      response.end()
    })
  } else if (path === '/sign_in' && method === 'GET') {
    let string = fs.readFileSync('./server/sign_in.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_in' && method === 'POST') {
    readBody(request).then((body)=>{
      let strings = body.split('&')
      // console.log(strings)
      let hash = {}
      strings.forEach((string)=>{
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let{email, password} = hash
      var users = fs.readFileSync('./server/db/users', 'utf8')
        try {
          users = JSON.parse(users)
        } catch(exception) {
          users = []
        }
        let found = false
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if(user.email === email && user.password === password) {
            found = true
            break
          }
        }
        if(found) {
          response.setHeader('Set-Cookie', `sign_in_email=${email}`)
          response.statusCode = 200
        }  else {
          response.statusCode = 401
        } 
        response.end()
      })
  } else if(path === '/all'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8081')
    var todos = fs.readFileSync('./server/db/todos', 'utf8')
    response.write(todos)
    response.end()
  } else if(path === '/add' && method === 'POST'){
    readBody(request).then((body)=>{
      let hash = JSON.parse(body)
      var todos = fs.readFileSync('./server/db/todos', 'utf8')
      try {
        todos = JSON.parse(todos)
      } catch(exception) {
        todos = []
      }
      hash.created_time = now()
      hash.id = taskId()
      todos.push(hash)
      var todosString = JSON.stringify(todos)
      fs.writeFileSync('./server/db/todos', todosString)
      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json;charset=utf-8')
      response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8081')
      hash = JSON.stringify(hash)
      response.write(hash)
      response.end()
      })
  } else if(path === '/update' && method === 'POST'){
    readBody(request).then((body)=>{
      let hash = JSON.parse(body)
      let {id, task} = hash
      var todos = fs.readFileSync('./server/db/todos', 'utf8')
      try {
        todos = JSON.parse(todos)
      } catch(exception) {
        todos = []
      }
      for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if(todo.id === id) {
          todos[i].task = task
          hash = todos[i]
        }
      }
      var todosString = JSON.stringify(todos)
      fs.writeFileSync('./server/db/todos', todosString)
      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json;charset=utf-8')
      response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8081')
      hash = JSON.stringify(hash)
      response.write(hash)
      response.end()
    })
  } else if(path === '/delete' && method === 'POST'){
    readBody(request).then((body)=>{
      let hash = JSON.parse(body)
      let {id} = hash
      log('id', id)
      var todos = fs.readFileSync('./server/db/todos', 'utf8')
      try {
        todos = JSON.parse(todos)
      } catch(exception) {
        todos = []
      }
      for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if(todo.id === id) {
          hash = todos.splice(i, i+1)
        }
      }
      var todosString = JSON.stringify(todos)
      fs.writeFileSync('./server/db/todos', todosString)
      response.statusCode = 200
      response.setHeader('Content-Type', 'application/json;charset=utf-8')
      response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8081')
      hash = JSON.stringify(hash)
      response.write(hash)
      response.end()
    })
  } else if(path === '/fe10_ajax_todo'){
    let string = fs.readFileSync('./fe10/fe10.ajax.todo.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if(path === '/todo.ajax.js'){
    let string = fs.readFileSync('./fe10/todo.ajax.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      {
        "error": "not found"
      }
    `)
    response.end()
  }
})

function readBody(request) {
  return new Promise((resolve, reject)=>{
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      resolve(body)
    })
  })
}

server.listen(port)
log(`服务器已经在 ${port} 端口启动了监听服务\n 请在空中旋转720度然后用电饭煲打开 http://localhost:${port}`)
