
const cfg = require('../config/env')
const ipAddress = require('ip').address()
const fs = require('fs')
const path = require('path')

module.exports = function getClientScript() {
  const hotServer = `http://${ipAddress}:${cfg.port}/hot-start`
  const filePath = path.resolve(__dirname, './server-router-hot-client-script.js')

  let script = fs.readFileSync(filePath, 'utf8')

  script = script.replace('${hotServerApi}', hotServer)

  return script
}
