var log = function() {
    console.log.apply(console, arguments)
}

var ajax = function(method, path, headers, data, responseCallback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            responseCallback(r)
        }
        // if (r.readyState === 4) {
        //     log('state change', r)
        //     var response = JSON.parse(r.response)
        //     log('response', response)
        // } else {
        //     log('change')
        // }
    }
    r.send(data)
}
ajax('GET', '/', null, '', function(r) {
    console.log(r.state, r.response)
})
