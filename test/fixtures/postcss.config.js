module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-custom-properties')({preserve: false}),
    require('cssnano')({preset: 'default'})
  ]
}
