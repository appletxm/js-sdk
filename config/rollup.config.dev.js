import hotReload from '../plugins/plugin-hot-reload'
import baseConfig from './rollup.config.base'

const cfg = require('./env')
const ipAddress = require('ip').address()
const { port } = cfg

baseConfig.plugins.push(hotReload({
  host: 'http://' + ipAddress,
  port: port
}))

baseConfig.output.push(
  {
    file: 'build/index.js',
    format: 'umd',
    name: 'HfWebTool',
    sourceMap: 'inline'
  }
)

export default  baseConfig

