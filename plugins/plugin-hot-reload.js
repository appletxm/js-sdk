const http = require('http')
const chalk = require('chalk')
let timer = 0
const step = 1000

function doPutToServer(options) {
  http.get(`${options.host}:${options.port}/hot-reload`, function(res){
    if (res.statusCode === 200) {
      console.info(chalk.green('[hot server] roll up hot build success'))
    } else {
      console.info(chalk.red('[hot server] roll up hot build faild'))
    }
  })
}

function putMsgToServer(options) {
  clearTimeout(timer)
  timer = setTimeout(function() {
    doPutToServer(options)
  }, step) 
}

export default function hotReload (options = {}) {
  return {
    name: 'hot-reload',
    // transform (code, id) {
    //   // console.info('******************', arguments, code, id)
    //   putMsgToServer(options)
    //   return code
    // }

    // resolveId(source) {
    //   console.info('*****source***', source)
    //   return null
    // },

    // load(id) {
    //   console.info('*****id***', id)
    //   return null
    // },

    buildEnd() {
      putMsgToServer(options)
    },

    // generateBundle() {
    //   console.info('*****generateBundle***')
    // },

    // writeBundle() {
    //   console.info('*****writeBundle***')
    // },

    // outputOptions() {
    //   console.info('*****outputOptions***')
    // }
  }
}
