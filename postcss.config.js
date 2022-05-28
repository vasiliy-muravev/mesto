const autoprefixer = require('autoprefixer'); // подключить PostCSS к «Вебпаку»
const cssnano = require('cssnano'); // минификация css-кода

module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};