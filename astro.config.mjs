import  { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import image from '@astrojs/image';
//import netlify from '@astrojs/netlify/functions';
import scss from 'rollup-plugin-scss';


export default defineConfig ({
  site: 'https://danielle-m.dev',         
  integrations: [preact(), image()],
  // output: 'static',
  // adapter: netlify(),
  // // vite: {
  // //   build: {
  // //     rollupOptions: {
  // //       plugins: [
  // //         scss()
  // //       ]
  // //     }
  // //   }
  // // }, 
  // rollupOptions: {
  //   plugins: [scss()]
  // }
});
