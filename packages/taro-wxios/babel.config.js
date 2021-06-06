/*
 * @Author: sam.li
 * @Date: 2021-06-01 14:38:34
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-01 14:38:43
 */
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: false,
                targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: false,
                helpers: false,
                regenerator: false,
                useESModules: false,
            },
        ],
        ['@babel/plugin-proposal-decorators', false],
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true,
            },
        ],
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-transform-property-mutators',
    ],
};
