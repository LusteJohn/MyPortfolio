import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import githubApi from './api/github.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // mirrors the Vercel serverless function during `vite dev`
  const apiDevPlugin = {
    name: 'github-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/github', async (_req, res) => {
        const prev = { ...process.env, GITHUB_TOKEN: env.GITHUB_TOKEN || env.VITE_GITHUB_TOKEN }
        process.env = prev
        try {
          await githubApi({ method: 'GET' }, res)
        } catch (err) {
          console.error('[github-api-dev]', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message, stack: err.stack }))
        }
      })
    }
  }

  return {
    plugins: [vue(), apiDevPlugin]
  }
})