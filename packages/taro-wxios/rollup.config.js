import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import { version } from './package.json';
import replace from '@rollup/plugin-replace';

const entry = 'src/index.js';
const dist = (name) => `dist/taro-http${name}.js`;
const moduleName = 'taroHttp';

const plugins = [
    // replace({
    //     __VERSION__: version,
    // }),
    nodeResolve({
        extensions: ['.js', '.ts'],
    }),
    commonjs(),
    eslint(),
    babel({
        exclude: 'node_modules/*',
        extensions: ['.js', '.ts'],
        babelHelpers: 'bundled',
    }),
];

const banner = `/**
 * taro http v${version}
 * @author sam.li
 * @description taro http.
 */`;

export default [
    {
        input: entry,
        output: [
            {
                file: dist(''),
                format: 'umd',
                name: moduleName,
                exports: 'default',
                banner,
            },
            {
                file: dist('.common'),
                format: 'cjs',
                exports: 'default',
                banner,
            },
            {
                file: dist('.esm'),
                format: 'es',
                banner,
            },
        ],
        plugins: plugins,
    },
    {
        input: entry,
        output: [
            {
                file: dist('.min'),
                format: 'umd',
                name: moduleName,
                exports: 'default',
                banner,
            },
            {
                file: dist('.common.min'),
                format: 'cjs',
                exports: 'default',
            },
            {
                file: dist('.esm.min'),
                format: 'es',
                banner,
            },
        ],
        plugins: [
            ...plugins,
            terser({
                compress: {
                    // turn off flags with small gains to speed up minification
                    arrows: false,
                    collapse_vars: false, // 0.3kb
                    comparisons: false,
                    computed_props: false,
                    hoist_funs: false,
                    hoist_props: false,
                    hoist_vars: false,
                    inline: false,
                    loops: false,
                    negate_iife: false,
                    properties: false,
                    reduce_funcs: false,
                    reduce_vars: false,
                    switches: false,
                    toplevel: false,
                    typeofs: false,

                    // a few flags with noticable gains/speed ratio
                    // numbers based on out of the box vendor bundle
                    booleans: true, // 0.7kb
                    if_return: true, // 0.4kb
                    sequences: true, // 0.7kb
                    unused: true, // 2.3kb

                    // required features to drop conditional branches
                    conditionals: true,
                    dead_code: true,
                    evaluate: true,

                    // drop_console: true, // console 交给对应的应用自行压缩删除即可
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    comments: false,
                },
            }),
        ],
    },
];
