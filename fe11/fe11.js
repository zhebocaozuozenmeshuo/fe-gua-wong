var log = function() {
    console.log.apply(console, arguments)
}

var Student = function(name, height) {
    this.name = name
    this.height = height
}
var s1 = new Student('gua', 169)
log(s1)

log('fe11 class')