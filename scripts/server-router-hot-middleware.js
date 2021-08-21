let hotRes = null
const chalk = require('chalk')
const getClientScript = require('./server-router-hot-client')
const step = 5000
let timer = 0

function getIdAndMessage(type) {
  const id = new Date().getTime()
  const msg = 'hot message'

  return { id, message: msg, type }
}

function sendMsgFromEventChannel(res, type) {
  const msg = getIdAndMessage(type)
  if (res) {
    res.write(`id: ${new Date().getTime()}\n`);
    res.write('event: hot\n')
    res.write('data: ' + JSON.stringify(msg) + '\n\n');

    clearInterval(timer)
    doHeartBeat()
  }
}

function sendPingEvent() {
  if (hotRes) {
    // console.info('**send ping**')
    hotRes.write(`id: ${new Date().getTime()}\n`);
    hotRes.write('event: 	😍\n')
    hotRes.write('data: empty\n\n')
  } else {
    clearInterval(timer)
  } 
}

function doHeartBeat() {
  timer = setInterval(() => {
    sendPingEvent()
  }, step)
}

function doHotReload (req, res) {
  // console.info('***************do hot reload*****************')
  res.sendStatus(200)
  res.end()
  if (hotRes) {
    sendMsgFromEventChannel(hotRes, 'hot')
  }
}

function createHotReloadEvent(req, res) {
  // console.info('**********Will create event source***********')
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  hotRes = res

  req.connection.addListener('close', function (e) {
    console.info(chalk('[hot server] hot server met a problem'))
    hotRes = null
    res.end()
  }, false);

  clearInterval(timer)
  sendPingEvent()
  doHeartBeat()
}

function getHotClientScript(req, res) {
  const script = getClientScript()

  res.set('Content-Type', 'application/x-javascript; charset=utf-8')
  res.send(script)
  res.end()
}

module.exports = {
  doHotReload,
  createHotReloadEvent,
  getHotClientScript
} 
