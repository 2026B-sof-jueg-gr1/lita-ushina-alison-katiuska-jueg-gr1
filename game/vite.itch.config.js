import { defineConfig } from 'vite';

function inlineGameScript() {
  return {
    name: 'inline-game-script',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find((file) =>
        file.type === 'asset' && file.fileName.endsWith('.html')
      );
      const entry = Object.values(bundle).find((file) =>
        file.type === 'chunk' && file.isEntry
      );

      if (!html || !entry) {
        throw new Error('Could not find the generated HTML or JavaScript entry.');
      }

      const scriptTag = /<script type="module" crossorigin src="[^"]+"><\/script>/;
      const htmlSource = String(html.source);
      if (!scriptTag.test(htmlSource)) {
        throw new Error('Could not find the generated game script tag in index.html.');
      }

      html.source = htmlSource.replace(scriptTag, () =>
        `<script type="module">${entry.code.replace(/<\/script/gi, '<\\/script')}</script>`
      );
      delete bundle[entry.fileName];
    }
  };
}

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist-itch',
    emptyOutDir: true,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  plugins: [inlineGameScript()]
});
