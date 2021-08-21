function runRollUpProcess() {
  const { exec } = require('child_process')
  exec('npm run rollup:watch', (error, stdout, stderr) => {
    if (error) {
      throw new Error('Roll up watch start failed, ', error)
      process.exit(1)
    }else {
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
      console.log(chalk.cyan('\n Roll up watch start success.\n'))
      resolve(true)
    }
  })
}

module.exports = {
  runRollUpProcess
}
