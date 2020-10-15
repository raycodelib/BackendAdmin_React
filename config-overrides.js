const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // for antd lib, package needed styles based on import (using babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // automatically package relevant styles
    }),
    addLessLoader({
        // use less-loader overwrite default variables in less
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    })
);
