import  { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import image from '@astrojs/image';
import netlify from '@astrojs/netlify/functions';


export default defineConfig ({
  site: 'https://danielle-m.dev',         
  integrations: [preact(), image()],
  output: 'server',
  adapter: netlify()
});
