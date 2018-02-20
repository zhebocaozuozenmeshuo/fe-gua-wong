const fs = require('fs')
const log = console.log.bind(console)
const blogFilePath = 'db/blog.json'

// 这是一个用来存储 Blog 的数据对象
const ModelBlog = function(form) {
  // || 是一种新的写法， 在 js 圈子里太过流行，所以记住即可
  // a = b || c 意思是如果 b 是 undefined 或者 null 就把 c 赋值给 a
  this.title = form.title || ''
  this.author = form.author || ''
  this.content = form.content || ''
  // 生成一个 unix 时间
  this.created_time = Math.floor(new Date() / 1000)
} 

const loadBlogs = function(callback) {
  let content = fs.readFileSync(blogFilePath, 'utf8')
  let blogs = JSON.parse(content)
  return blogs
}

var b = {
  data: loadBlogs()
}

b.new = function(form) {
  console.log('this.data', this.data)
  var m = new ModelBlog(form)
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
  fs.writeFile(blogFilePath, s, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('保存成功')
    }
  })
}


b.all = function() {
  let blogs = this.data
  // 遍历 blogs, 插入 comments
  const comment = require('./comment')
  const comments = comment.all()
  for (var i = 0; i < blogs.length; i++) {
    let b = blogs[i]
    let cs = []
    for (var j = 0; j < comments.length; j++) {
      var c = comments[j]
      if (b.id === c.blog_id) {
        cs.push(c)
      }
    }
    b.coments = cs
  }
  return blogs
}

module.exports = b
