const fs = require('fs')

const filePath = 'db/comment.json'

// 这是一个用来存储 Blog 的数据对象
const ModelComment = function(form) {
  // || 是一种新的写法， 在 js 圈子里太过流行，所以记住即可
  // a = b || c 意思是如果 b 是 undefined 或者 null 就把 c 赋值给 a
  this.author = form.author || ''
  this.content = form.content || ''
  this.blog_id = form.blog_id || 0
  // 生成一个 unix 时间
  this.created_time = Math.floor(new Date() / 1000)
}

const loadData = function(callback) {
  let content = fs.readFileSync(filePath, 'utf8')
  let data = JSON.parse(content)
  return data
}

var b = {
  data: loadData()
}

b.new = function(form) {
  console.log('this.data', this.data)
  var m = new ModelComment(form)
  var d = this.data[this.data.length-1]
  if (d == undefined) {
    m.id = 1
  } else {
    m.id = d.id + 1
  }
  this.data.push(m)
  this.save()
  return m
}

b.save = function() {
  var s = JSON.stringify(this.data, null, 2)
  fs.writeFile(filePath, s, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('保存成功')
    }
  })
}


b.all = function() {
  return this.data
}

module.exports = b
