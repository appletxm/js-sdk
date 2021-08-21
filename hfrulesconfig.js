module.exports = {
  commitMessage: {
    rule: /^(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types):\s.{5,100}$/im
  },

  dirFileName: {
    basePath: './',
    rule: /^[a-z][a-z|$|\d]*(-[\w]+)*(\.[\w]+)*$/,
    ignore: /^mocks|assets|CHANGELOG.MD|logs|dist|build$/
  }
}
