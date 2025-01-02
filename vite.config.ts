import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import { fileURLToPath } from 'url'
// 引入SVG需要用到的插件
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';

// import svgIconsPlugin from 'vite-plugin-svg-icons';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载各个环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  console.log('env is ', env);

  return {
    plugins: [vue(),
    viteMockServe({
      // default
      mockPath: 'mock',
      // 保证开发阶段可以使用mock接口
      enable: command === 'serve',
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    ],
    resolve: { alias: { '@': path.resolve('./src') } },
    // resolve: {
    //   alias: {
    //     // "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
    //     // '@': path.resolve(__dirname, 'src')
    //     // '@':fileURLToPath(new URL('./src', import.meta.url))
        
    //   },
    // },
    // // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          // api: 'modern', // or "modern"
          silenceDeprecations: ["legacy-js-api"], //不再弹出警告信息
          javascriptEnabled: true,
          // additionalData: '@use "./src/styles/variable.scss";',
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
    //代理跨域
    // server: {
    //   proxy: {
    //     "/api/admin/acl": { // 更新代理规则以匹配新的路径
    //       target: "http://139.198.104.58:8212", // 目标后端服务
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //     "/api": {
    //       //获取数据的服务器地址设置
    //       target: "http://39.98.123.211:8510",
    //       //需要代理跨域
    //       changeOrigin: true,
    //       //路径重写
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     }
    //   }
    // }
    // server: {
    //   proxy: {
    //     "/api/admin/acl": { // 更新代理规则以匹配新的路径
    //       target: "http://139.198.104.58:8212", // 目标后端服务
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //     "/api": {
    //       //获取数据的服务器地址设置
    //       target: "http://39.98.123.211:8510",
    //       //需要代理跨域
    //       changeOrigin: true,
    //       //路径重写
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     }
    //   }
    // }

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





