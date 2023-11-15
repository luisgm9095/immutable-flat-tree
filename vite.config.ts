import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      reducers: resolve(__dirname, './src/reducers'),
      types: resolve(__dirname, './src/types'),
      utils: resolve(__dirname, './src/utils'),
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index'
    }, 
  },
  plugins: [dts({
    exclude: ['src/tests/**/*']
  })],
})
