const http = require('http')
const url = require('url')
const fs = require('fs')
const log = function() {
  console.log.apply(console, arguments)
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
  log(`wong tells: the path contain query \n ${pathWithQuery}`)
  if (path === '/') {
    let string = fs.readFileSync('./server/index.html', 'utf8')
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
      let strings = body.split('&')
      // console.log(strings)
      let hash = {}
      strings.forEach((string)=>{
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = value
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
        response.write('password not match')
      } else {
        response.statusCode = 200
      }
      response.end()
    })
  } else if (path === '') {

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
