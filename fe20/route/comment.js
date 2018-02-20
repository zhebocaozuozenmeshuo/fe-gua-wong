var routes = []

var all = {
  path: '/api/comment/all',
  method: 'get',
  func: function(req, res){
    let form = request.body
    let b = blog.new(form)
    let r = JSON.stringify(b)
    response.send(r)
  }
}
