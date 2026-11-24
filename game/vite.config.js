import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');

function landingMiddleware(req, res, next) {
  if (req.url === '/' || req.url?.startsWith('/lita-ushina-alison-katiuska-jueg-gr1/')) {
    if (req.url === '/' || req.url === '/lita-ushina-alison-katiuska-jueg-gr1/' ||
      req.url === '/lita-ushina-alison-katiuska-jueg-gr1/index.html') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(readFileSync(resolve(repositoryRoot, 'index.html')));
      return;
    }
  }
  next();
}

export default defineConfig({
  base: '/lita-ushina-alison-katiuska-jueg-gr1/game/',
  server: {
    fs: {
      allow: [repositoryRoot]
    }
  },
  plugins: [
    {
      name: 'local-repository-landing',
      configureServer(server) {
        server.middlewares.use(landingMiddleware);
      },
      configurePreviewServer(server) {
        server.middlewares.use(landingMiddleware);
      }
    }
  ]
});
