const express = require('express')
const app = express()
const assetsRouter = require('./server-router-assets')
const apiRouter = require('./server-router-api')
const { createHotReloadEvent, doHotReload, getHotClientScript } = require('./server-router-hot-middleware')
const logger = require('./server-log')
const ipAddress = require('ip').address()
const chalk = require('chalk')
const cfg = require('../config/env')

const { port, host } = cfg

process.env.NODE_ENV = 'development'

app.use('/hot-client', (req, res) => {
  getHotClientScript(req, res)
})

app.use('/hot-start', (req, res) => {
  createHotReloadEvent(req, res)
})

app.use('/hot-reload', (req, res) => {
  doHotReload(req, res)
})

app.use(['/api', '/app/v1', '/web'], (req, res) => {
  apiRouter(req, res, logger)
})

app.use(['/', '/src', '/assets', 'fav.ico'], (req, res) => {
  assetsRouter(req, res, logger)
})

app.use('*', (req, res) => {
  logger.info('No Url Matched', req.originalUrl)
  res.send('no matched url')
})

app.listen(port, host, function () {
  const localUrl = 'http://localhost:' + port
  const ipUrl = `http://${ipAddress}:${port}`

  logger.info('dev server started at: ', ipUrl)

  console.info(`${chalk.magenta('dev server started at: ')}`)
  console.info(`${chalk.green('-----------------------------------------')}`)
  console.info(`loclhost: ${chalk.blue(localUrl)}`)
  console.info(`ip: ${chalk.blue(ipUrl)}`)
  console.info(`${chalk.green('-----------------------------------------')}`)
})
