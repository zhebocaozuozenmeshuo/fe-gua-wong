// Document object model DOM

//
var log = function() {
    console.log.apply(console, arguments)
}

log('代码开始')

var body = document.querySelector('body')
var form = document.querySelector('.login-form')
var loginButton = document.querySelector('#id-button-login')
var pwd = document.querySelector('#id-input-password')
log(body, form, loginButton)

var user = document.querySelector('#id-input-username')
var userValue = user.getAttribute('value')
log('user value: ', userValue)
var button = document.createElement('button')
button.innerHTML = '注册用户'
form.appendChild(button)
// form.removeChild(pwd)
// pwd.remove()

var clicked = function() {
    log('你点击了按钮')
}
loginButton.addEventListener('click', clicked)

var buttons = document.querySelectorAll('.radio-button')
for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i]
    button.addEventListener('click', function(event) {
        var self = event.target
        clearActive()
        self.classList.add('active')
    })
}
var clearActive = function() {
    var s = document.querySelector('.active')
    if (s != null) {
        s.classList.remove('active')
    }
}
