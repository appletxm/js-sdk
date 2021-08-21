// import { uglify } from 'rollup-plugin-uglify'
import baseConfig from './rollup.config.base'

// baseConfig.plugins.push(uglify())

baseConfig.output.push(
  {
    file: 'build/index.js',
    format: 'umd',
    name: 'HfWebTool',
    sourceMap: 'inline'
  },

  {
    file: `build/index.common.js`,
    format: 'cjs'
  },

  {
    file: `build/index.amd.js`,
    format: 'amd'
  },

  {
    file: `build/index.esm.js`,
    format: 'es'
  }
)

export default baseConfig
