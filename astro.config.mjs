import  { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import image from '@astrojs/image';


export default defineConfig ({
  site: 'https://danielle-m.dev',         
  integrations: [preact(), image()],

});
