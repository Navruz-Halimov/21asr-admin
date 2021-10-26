module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    // some changes are made
    resolve: {
       symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils'
  ]
}
