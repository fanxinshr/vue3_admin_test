import SvgIcon from './SvgIcon/index.vue'

// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

console.log('SvgIcon is ',SvgIcon);
// 全局对象
const allGlobalComponent = {SvgIcon}


// 对外暴露插件对象
export default {
    // 务必叫做install方法
    install(app:any){
        console.log("heihei");
        console.log(app);
        // 注册项目的全部的全局组件
        Object.keys(allGlobalComponent).forEach( item => {
            console.log(123456);
            

        });
        // 将element-plus提供的图标注册为全局组件
        // 数组，里面放图标的名字和组件
        console.log(Object.entries(ElementPlusIconsVue));
        
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
        
        

    }

}