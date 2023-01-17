// import fs from 'fs';
import { fileURLToPath, URL } from 'url';
import packageJson from './package.json';
import path from 'path';
import { loadEnv, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import analyze from 'rollup-plugin-analyzer';
// import { visualizer } from 'rollup-plugin-visualizer';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';
import { VitePWA } from 'vite-plugin-pwa';
// import babel from 'vite-plugin-babel';
// import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const app = process.env.APP || 'trove';
  process.env.VITE_APP = app;
  process.env.VITE_STORAGE_VERSION =
    mode === 'dev' ? Date.now().toString() : packageJson.version;

  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL =
    process.env.SHIP_URL || process.env.VITE_SHIP_URL || 'http://localhost:80';
  console.log(SHIP_URL);

  const base = (mode, app) => {
    console.log(mode, app);
    return '/apps/trove/';
  };
  return defineConfig({
    // vite: {
    base: base(mode, app),
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'styled-components': path.resolve('./node_modules/styled-components'),
        'styled-system': path.resolve('./node_modules/styled-system'),
        '@mui/material': path.resolve('./node_modules/@mui/material'),
        '@urbit/vite-plugin-urbit': path.resolve(
          './node_modules/@urbit/vite-plugin-urbit'
        ),
        'landscape-apps': path.resolve('./node_modules/landscape-apps'),
        '@/': fileURLToPath(new URL('./src', import.meta.url)),
        '@mui/styled-engine': path.resolve('./node_modules/@mui/styled-engine'),
        // '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    // mode: process.env.NODE_ENV,
    build: {
      target: 'esnext',
      minify: true,
      sourcemap: false,
      manifest: true,
      rollupOptions: {
        // external: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],
        plugins: [
          analyze({
            limit: 20,
          }),
          // visualizer(),
        ],
        output: {
          manualChunks: {
            'react-dom': ['react-dom'],
            react: ['react'],
            // 'styled-components': ['styled-components'],
            '@mui/material': ['@mui/material'],
            lodash: ['lodash'],
          },
          minifyInternalExports: true,
        },
      },
    },
    server: {
      fs: {
        allow: ['../../../../../'],
      },
      cors: true,
    },
    plugins: [
      urbitPlugin({
        base: 'trove',
        target: SHIP_URL,
        changeOrigin: true,
        secure: false,
      }),
      reactRefresh(),
      // babel(),
      // VitePWA({
      //   registerType: 'autoUpdate',
      //   devOptions: {
      //     enabled: true,
      //   },
      // }),
    ],
  });
};

// const pwaOptions = {
//   mode: 'development',
//   base: '/',
//   includeAssets: ['favicon.svg'],
//   manifest: {
//     name: 'PWA Router',
//     short_name: 'PWA Router',
//     theme_color: '#ffffff',
//     icons: [
//       {
//         src: 'pwa-192x192.png', // <== don't add slash, for testing
//         sizes: '192x192',
//         type: 'image/png',
//       },
//       {
//         src: '/pwa-512x512.png', // <== don't remove slash, for testing
//         sizes: '512x512',
//         type: 'image/png',
//       },
//       {
//         src: 'pwa-512x512.png', // <== don't add slash, for testing
//         sizes: '512x512',
//         type: 'image/png',
//         purpose: 'any maskable',
//       },
//     ],
//   },
//   devOptions: {
//     enabled: process.env.SW_DEV === 'true',
//     /* when using generateSW the PWA plugin will switch to classic */
//     type: 'module',
//     navigateFallback: 'index.html',
//   },
// };

// const replaceOptions = { __DATE__: new Date().toISOString() }
// const claims = process.env.CLAIMS === 'true'
// const reload = process.env.RELOAD_SW === 'true'
// const selfDestroying = process.env.SW_DESTROY === 'true'

// if (process.env.SW === 'true') {
//   pwaOptions.srcDir = 'src'
//   pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
//   pwaOptions.strategies = 'injectManifest'
//   ;(pwaOptions.manifest).name = 'PWA Inject Manifest'
//   ;(pwaOptions.manifest).short_name = 'PWA Inject'
// }

// if (claims)
//   pwaOptions.registerType = 'autoUpdate'

// if (reload) {
//   // @ts-expect-error just ignore
//   replaceOptions.__RELOAD_SW__ = 'true'
// }

// if (selfDestroying)
//   pwaOptions.selfDestroying = selfDestroying

// // export default defineConfig({
//   // base: process.env.BASE_URL || 'https://github.com/',
//   build: {
//     sourcemap: process.env.SOURCE_MAP === 'true',
//   },
//   plugins: [
//     reactRefresh(),
//     VitePWA(pwaOptions),
//     replace(replaceOptions),
//   ],
// })
