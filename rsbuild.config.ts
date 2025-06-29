import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
    plugins: [
        pluginReact(),
        pluginSvgr({
        mixedImport: true,
            svgrOptions: {
                exportType: 'named',
                svgo: false,
            },
        })
    ],
    html: {
        template: './index.html',
    },
    output: {
        distPath: {
            root: 'build',
        },
        assetPrefix: '/top-drives-card-generator/',
    },
});
