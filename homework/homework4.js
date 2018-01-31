var log = function() {
  console.log.apply(console, arguments)
}
var ensure = function(conditions, message) {
  if (!conditions) {
    log(message)
  }
}

log('lesson4 homework load')
