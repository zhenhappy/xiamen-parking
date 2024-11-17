import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import UniPlatformModifier from '@uni-helper/vite-plugin-uni-platform-modifier'
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniHelperPages({
        dts: 'src/uni-pages.d.ts',
      }),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniHelperLayouts(),
      // https://github.com/uni-helper/vite-plugin-uni-components
      UniHelperComponents({
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
      }),
      UniPlatformModifier(),
      VueMacros({
        shortEmits: true, // 简化 emits 的定义

        // v-model 的语法糖
        shortVmodel: {
          prefix: '$',
        },

        reactivityTransform: true, // 省去写.value这样繁琐的写法
        shortBind: true, // 绑定相同数据名称的 prop 的语法糖, 例如:value -> :value="value"

        // 使用 $defineProps 可以正确地解构 props 的类型
        defineProp: {
          edition: 'kevinEdition',
        },

        defineEmit: true, // 使用 defineEmit 逐个声明单个 emit
        setupComponent: true,
        setupSFC: true,
        exportProps: true, // 在 Vue 中使用 Svelte 风格声明 props
        exportRender: true, // 在 Vue SFC 的 <script setup> 中，把 export default 语句转换为组件的渲染函数
        chainCall: true, // 扩展 defineProps，支持链式调用 withDefaults
        jsxDirective: true, // 在 JSX 中使用 Vue 内置指令
        booleanProp: false, // 把 <Comp checked /> 转换为 <Comp :checked="true" />, 不建议打开，和UnoCSS冲突

        plugins: {
          vue: Uni(),
        },
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', '@vueuse/core', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores', 'src/utils'],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],
  })
}
