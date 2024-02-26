import { fileURLToPath, URL } from 'node:url'

// Vite 配置
import { defineConfig } from 'vite'

// Vue 配置
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/xiamen-parking/',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // Vue 配置
    VueMacros({
      plugins: {
        vue: Vue(),
        // vueJsx: VueJsx(), // 如果需要
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      // dirs: ['./src/config'],
      dts: './src/auto-imports.d.ts',
    }),
  ],
})
