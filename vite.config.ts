import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入SVG需要用到的插件
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';

// import svgIconsPlugin from 'vite-plugin-svg-icons';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各个环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue(),
      viteMockServe({
        //default
        mockPath: 'mock',
        // 保证开发阶段可以使用mock接口
        enable: command === 'serve',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "./src/styles/variable.scss";',
        }
      }
    },
    // 代理跨域
    server:{
      proxy:{
          [env.VITE_APP_BASE_API]:{
            // 获取数据的服务器地址的设置
            target: env.VITE_SERVE,
            // 是否需要代理跨域
            changeOrigin: true,
            // 路径重写
            rewrite: (path) => path.replace(/^\/api/, ''),
          }
      }
    }
  }
})


// export default defineConfig(() => {
//   return {
//     publicPath: 'https://gitee.com/jch1011/guiguzhenxuan',
//     plugins: [vue(),
//     createSvgIconsPlugin({
//       iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//       symbolId: 'icon-[dir]-[name]',
//     })
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
//       }
//     },


//   }
// })





