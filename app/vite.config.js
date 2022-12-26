import fs from 'fs';
import path from 'path';
import { loadEnv, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';
import { VitePWA } from 'vite-plugin-pwa';
import babel from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL =
    process.env.SHIP_URL || process.env.VITE_SHIP_URL || 'http://localhost:80';
  console.log(SHIP_URL);

  return defineConfig({
    // vite: {
    resolve: {
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'styled-components': path.resolve('./node_modules/styled-components'),
        'styled-system': path.resolve('./node_modules/styled-system'),
        '@urbit/vite-plugin-urbit': path.resolve(
          './node_modules/@urbit/vite-plugin-urbit'
        ),
      },
    },
    // mode: process.env.NODE_ENV,
    build: {
      target: 'esnext',
      minify: true,
      sourcemap: true,
      manifest: true,
    },
    server: {
      fs: {
        allow: ['../../../../../'],
      },
      cors: true,
    },
    plugins: [
      urbitPlugin({ base: 'trove', target: SHIP_URL, secure: false }),
      reactRefresh(),
      reactVirtualized(),
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

const BAD_IMPORT = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;
export function reactVirtualized() {
  return {
    name: 'flat:react-virtualized',
    // Note: we cannot use the `transform` hook here
    //       because libraries are pre-bundled in vite directly,
    //       plugins aren't able to hack that step currently.
    //       so instead we manually edit the file in node_modules.
    //       all we need is to find the timing before pre-bundling.
    configResolved() {
      const file = require
        .resolve('react-virtualized')
        .replace(
          path.join('dist', 'commonjs', 'index.js'),
          path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js')
        );
      const code = fs.readFileSync(file, 'utf-8');
      const modified = code.replace(BAD_IMPORT, '');
      fs.writeFileSync(file, modified);
    },
  };
}

// export default defineConfig({
//   plugins: [ reactVirtualized() ], // add
// }

// import replace from '@rollup/plugin-replace'

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
// }

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
