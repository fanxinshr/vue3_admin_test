import { createApp } from 'vue'
import router from './router'
// SVG插件需要配置代码
// import "virtual:svg-icons-register"
// import 'virtual:svg-icons-register'


// import './style.css'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// // 需要全局引入再添加
// import svgIcon from './components/SvgIcon/index.vue'

import App from './App.vue'

// import { Virtual } from 'swiper/modules'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import { log } from 'console';

// import ja from 'element-plus/es/locale/lang/ja'

// 引入仓库
import pinia from './store'

const app = createApp(App)

// 国际化配置
app.use(ElementPlus, {
    locale: zhCn,
    //   locale: ja,
})


// 使用element-plus插件
// app.use(ElementPlus)
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })

// 引入自定义插件对象，注册整个项目的全局组件
import globalComponent from './components';

// console.log(globalComponent);
// 安装自定义插件
app.use(globalComponent)

// 注册模板路由
app.use(router);

// 安装仓库
app.use(pinia);

// 引入路由鉴权文件
// import './permission'

// 将应用挂载到挂载点上
app.mount('#app')

// createApp(App).mount('#app')
// console.log(import.meta.env);

// 引入模板的全局样式
import '@/styles/index.scss'




// 箭头函数
// const fun = () => {
//     console.log("Hello");
// }
// fun()

// 测试假的接口(mock接口)能否使用
import axios from 'axios'
// 登录接口
axios({
    url:'/api/user/login',
    method:'post',
    data:{
        username:'admin',
        password:'111111'
    }

})
