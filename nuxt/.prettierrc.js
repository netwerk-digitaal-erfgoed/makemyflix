const baseConfig = require('../prettier.base.js');

module.exports = {
  ...baseConfig,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
