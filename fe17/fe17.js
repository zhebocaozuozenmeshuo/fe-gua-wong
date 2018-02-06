const log = function() {
  console.log.apply(console, arguments)
}

const os = require('os')
log('os up time', os.uptime())
