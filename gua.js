var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)    
    } else {
        element.classList.add(className)
    }
}

// responseClass 是事件委托的当事人
var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(let i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    } 
}

// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}

// 
var removeClassAll = function(className) {
    var selector = `.${className}`
    var elements = document.querySelectorAll(selector)
    for(let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
} 