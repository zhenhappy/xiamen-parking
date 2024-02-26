module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 200, // rem基准字号
      minPixelValue: 2, // 小于2px不转换
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      propList: ["*"], // 指定要转换的属性, 通配符'*'表示匹配所有属性
      selectorBlackList: [":root", "#app", "ignore"], // 指定不转换的类名，可以自定义，可以无限添加, 建议定义一至两个通用的类名
      replace: true, // 替换包含vw单位
      // exclude: /(\/|\\)(node_modules)(\/|\\)/, // 排除目录
    },
    cssnano: {
      preset: [
        "advanced",
        {
          autoprefixer: false,
          reduceIdents: false, // 禁止将 keyframes 自动更名
          mergeIdents: false, // 禁止自动合并 keyframes
          discardUnused: false, // 禁止移除掉未使用的 keyframes
          zindex: false, // 禁止自动转换 z-index
          discardComments: {
            removeAll: true,
          },
        },
      ],
    },
  },
};
