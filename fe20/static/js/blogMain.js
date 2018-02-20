const blogNew = function(form) {
  // let form = {
  //   title: '测试标题',
  //   author: 'gua',
  //   content: '测试内容'
  // }
  let data = JSON.stringify(form)
  let request = {
    method: 'POST',
    url: '/api/blog/add',
    data,
    contentType: 'application/json',
    callback: function(response) {
      let res = JSON.parse(response)
      console.log('响应', res)
    }
  }
  ajax(request)
}

 const ajax = function(request) {
  var r = new XMLHttpRequest()
  r.open(request.method, request.url, true)
  if(request.contentType !== undefined) {
      r.setRequestHeader('Content-Type', request.contentType)
  }
  r.onreadystatechange = function(event) {
    if (r.readyState === 4) {
      request.callback(r.response)
    }
  }
  if(request.method === 'GET') {
    r.send()
  } else {
    r.send(request.data)
  }
}

const blogTemplate = function(blog) {
  let id = blog.id
  let title = blog.title
  let author = blog.author
  let d = new Date(blog.created_time * 1000)
  let time = d.toLocaleString()
  // <a href="/blog?id=${id}">${title}</a>
  let t = `
  <div class="gua-blog-cell">
    <div class="">
      <a class="blog-title" href="#" data-id="${id}">${title}</a>
    </div>
    <div class="">
      <span>${author}</span> @ <time>${time}</time>
    </div>
    <div class="blog-comments">
      <div id="new-comment">
        <input type="hidden" class="comment-blog-id" value="${id}"/>
        <input type="text" class="coment-author" />
        <input type="text" class="coment-content" />
        <button class="comment-add">添加评论</button>
      </div>
    </div>
  </div>
  `
  return t
}

const insertBlogAll = function(blogs) {
  var html = ''
  for (var i = 0; i < blogs.length; i++) {
    let b = blogs[i]
    let t = blogTemplate(b)
    html += t
  }
  let div = document.querySelector('.gua-blogs')
  div.innerHTML = html
}

const blogAll = function() {
  const request = {
    method: 'GET',
    url: 'api/blog/all',
    contentType: 'application/json',
    callback: function(response) {
      // 不考虑错误情况(断网/服务器返回错误等)
      console.log('响应', response)
      const blogs = JSON.parse(response)
      window.blog = blogs
      insertBlogAll(blogs)
    }
  }
  ajax(request)
}

let e = sel => document.querySelector(sel)

const bindEvents = function() {
  // 绑定发表新博客事件
  let button = e('#id-button-submit')
  button.addEventListener('click', function(event){
    // 得到用户填写的数据
    let form = {
      title: e('#id-input-title').value,
      author: e('#id-input-author').value,
      content: e('#id-input-content').value,
    }
    // 用这个数据调用 blogNew 来创建一篇新博客
    blogNew(form)
  })
}

const __main = function() {
  // 载入博客列表
  blogAll()
  // 绑定事件
  bindEvents()
}
__main()
