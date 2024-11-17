import uni from '@uni-helper/eslint-config'

export default uni(
  {
    rules: {
      // 自闭合标签很不方便，你输入view会给你变成<view />，要写入内容，你还要删改
      'vue/html-self-closing': 'off',
    },
    unocss: true,
  },
)
