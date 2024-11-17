import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetUni } from '@uni-helper/unocss-preset-uni'

export default defineConfig({
  shortcuts: {
    // 快速给元素添加边框, 用于看清楚元素的边界，开发调试用
    'bbb': 'border-1rpx border-black border-solid',
    'bbw': 'border-1rpx border-white border-solid',
    'border': 'border-1rpx border-black border-solid',
    'flex-center': 'flex items-center justify-center',
  },
  presets: [
    presetUni(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // HBuilderX 必须针对要使用的 Collections 做异步导入
      // collections: {
      //   carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      // },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
