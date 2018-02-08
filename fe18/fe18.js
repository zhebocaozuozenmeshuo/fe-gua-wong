// lesson18
'use strict'

const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const log = function() {
    console.log.apply(console, arguments)
}

// 定义一个类来保存电影的信息
const Movie = function() {
  this.name = ''
  this.score = 0
  this.quote = 0
  this.ranking = 0
  this.coverUrl = ''
}

/*
<div class="item">
  <div class="pic">
     <em class="">1</em>
     <a href="https://movie.douban.com/subject/1292052/">
         <img width="100" alt="肖申克的救赎" src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp" class="">
     </a>
  </div>
  <div class="info">
     <div class="hd">
         <a href="https://movie.douban.com/subject/1292052/" class="">
             <span class="title">肖申克的救赎</span>
             <span class="title">&nbsp;/&nbsp;The Shawshank Redemption</span>
             <span class="other">&nbsp;/&nbsp;月黑高飞(港)  /  刺激1995(台)</span>
         </a>
         <span class="playable">[可播放]</span>
     </div>
     <div class="bd">
         <p class="">
             导演: 弗兰克·德拉邦特 Frank Darabont&nbsp;&nbsp;&nbsp;主演: 蒂姆·罗宾斯 Tim Robbins /...<br>
             1994&nbsp;/&nbsp;美国&nbsp;/&nbsp;犯罪 剧情
         </p>
         <div class="star">
                 <span class="rating5-t"></span>
                 <span class="rating_num" property="v:average">9.6</span>
                 <span property="v:best" content="10.0"></span>
                 <span>965275人评价</span>
         </div>
         <p class="quote">
             <span class="inq">希望让人自由。</span>
         </p>
     </div>
  </div>
</div>
*/

const movieFromDiv = function(div) {
  // 这个函数来从一个电影 div 里面读取电影信息
  const movie = new Movie()
  // 使用 cheerio.load 函数返回一个可以查询的特殊对象
  const e = cheerio.load(div)

  // 然后就可以使用 querySelector 语法来获取信息了
  // .text() 获取文本信息 === innerText
  movie.name = e('.title').text()
  movie.score = e('.rating_num').text()
  movie.quote = e('.inq').text()

  const pic = e('.pic')
  movie.ranking = pic.find('em').text()
  // 元素的属性用 .attr('属性名') 确定
  movie.coverUrl = pic.find('img').attr('src')

  return movie
}

const saveMovies = function(movies) {
  const path = 'douban.txt'
  // 第二个参数是 null 不用管
  // 第三个参数是缩进层次
  const s = JSON.stringify(movies, null, 2)
  fs.writeFile(path, s, function(error) {
    if(error != null){
      log('write file down')
    } else {
      log('spider nb')
    }
  })
}

const moviesFormUrl = function(url) {
  // request 从 url 下载数据并调用回调函数
  // 检查请求是否成功， statusCode 200 是成功的代码
  request(url, function(error, response, body){
      if (error === null && response.statusCode === 200) {
        // cheerio.load 用字符串作为参数返回一个可以查询的特殊对象
        // body 就是 html 内容
        const e = cheerio.load(body)
        const movies = []
        // 查询对象的查询语法 和 DOM API 中的 querySelector 一样
        const moviesDivs = e('.item')
        for (let i = 0; i < moviesDivs.length; i++) {
          let element = moviesDivs[i]
          // 获取 div 的元素并且用 movieFromDiv 解析
          // 然后加入到 movies 数组中
          const div = e(element).html()
          const m = movieFromDiv(div)
          movies.push(m)
        }
        // 保存 movies 数组到文件中
        saveMovies(movies)
      } else {
        log('spider down ', error)
      }
  })
}

const __main = function() {
  log('spider work')

  // 这是主函数
  // 下载网页， 解析出电影信息， 保存到文件
  const url = 'https://movie.douban.com/top250'
  moviesFormUrl(url)
}

// 程序开始的主函数
__main()
