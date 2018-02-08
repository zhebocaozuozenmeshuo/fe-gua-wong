// 知乎.js
'use strict'

const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const log = function() {
    console.log.apply(console, arguments)
}

function Answer() {
  this.author = ''
  this.content = ''
  this.link = ''
}

const answerFromDiv = function(div) {
  // 这个函数从一个回答 div 里面读取回答信息
  const a = new Answer()
  // 使用 cheerio.load 函数来返回一个可以查询的特殊对象
  const options = {
    decodeEntities: false
  }
  const e = cheerio.load(div, options)
  // 然后就可以用 querySelector 语法来获取信息了
  // .text() 获取文本信息
  a.author = e('.AuthorInfo-head > .UserLink-link').text()
  // 如果用 text() 则会获取不到回车
  // 这里要有一段爬虫的奥义
  a.content = e('.RichText').html()
  return a
}

const answersFromBody = function(body) {
  const options = {
    decodeEntities: false,
  }
  const e = cheerio.load(body, options)
  const divs = e('.ContentItem.AnswerItem')
  const answers = []
  // jsbeautifier.org
  // 保存本地 改样式
  for (let i = 0; i < divs.length; i++) {
    const element = divs[i];
    const div = e(element).html()
    const m = answerFromDiv(div)
    answers.push(m)
  }
  return answers
}

const writeToFile = function(path, data) {
  fs.writeFile(path, data, function(error){
    if (error != null) {
      log('--- 写入成功')
    } else {
      log(error)
      log('*** 写入失败')
    }
  })
}

const cachedUrl = function(options, callback) {
  // 先尝试去硬盘读取这个 url 对应的文件
  const path = options.url.split('/').join('-').split(':').join('-')
  fs.readFile(path, function(error, data){
    if(error != null) {
      // 读取这个文件失败
      // 读不到的话说明是第一次请求， 那么就是用 request
      request(options, function(error, response, body){
        callback(error, response, body)
        // 下载好了之后 保存到本地文件
        // TODO, 应该下载成功后在保存
        writeToFile(path, body)
      })
    } else {
      // 读取到，说明已经下载过了， 我们将直接读取硬盘上的文件
      log('读取到缓存的页面', path)
      const response = {
        statusCode: 200,
      }
      callback(null, response, data)
    }
  })

}

const __main = function() {
  log('spider work')

  // 这是主函数
  // 知乎答案
  const url = 'https://www.zhihu.com/question/62011975'
  // request 从一个 url 下载数据并调用回调函数
  // 根据 伪装登录爬虫设置图例 替换 cookie 和 useragent 中的内容
  const cookie = 'q_c1=05852f7dda584d2eacec66eaa005d312|1517192573000|1517192573000; q_c1=938d29751f89473781a2834fc9c3bbf4|1517192573000|1517192573000; _zap=cabb86b7-5615-4e32-b6b6-639e7f378c15; capsion_ticket="2|1:0|10:1517192842|14:capsion_ticket|44:ZTRjN2JkZjU3N2YzNDMyZWI3M2U0YTAwNmI1YWU1MDk=|4d0ace7dcb7bab431fe0bacb59822102a8df6b6cefc3a1ffcf8f8b4fabaefbf1"; z_c0="2|1:0|10:1517192854|4:z_c0|92:Mi4xNjRkS0F3QUFBQUFBOENzaENBSVFEU1lBQUFCZ0FsVk5sdFJiV3dDY2p6T29IaHFRbFBha0VFclVPN015YzIyZjBn|3410098a2a51c9c18280a3ab908231bfcda12ac54cd4ee10edc2dd749e1934ec"; __utmz=51854390.1517533040.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/people/wang-hong-kun-28/collections; __utmv=51854390.100--|2=registration_date=20160726=1^3=entry_date=20160726=1; aliyungf_tc=AQAAAOxD3BCajAQA6groe1/zO+Nng4LS; _xsrf=782cc4ea-5fe2-4d8d-a5cb-4f319a601c25; d_c0="APCsOUd2Gw2PTjy9Zqk_7vZedzko242a0QQ=|1517961244"; __utma=51854390.255651822.1517533040.1517533040.1517967349.2; __utmb=51854390.0.10.1517967349; __utmc=51854390'
  const useragent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36'
  const headers = {
    'Cookie': cookie,
    'User-Agent': useragent,
  }
  const options = {
    url,
    headers,
  }
  cachedUrl(options, function(error, response, body){
    if (error === null && response.statusCode === 200) {
      // log('crawl body', body)

      const answers = answersFromBody(body)

      // 引入自己写的模块文件
      // ./ 表示当前目录
      const utils = require('./utils')
      const path = 'zhihu.answers.txt'
      // utils.saveJSON(path, answers)
    } else {
      log('spider down')
    }
  })
}

// 主函数
__main()
