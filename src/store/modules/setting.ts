// 小仓库，关于layout组件相关配置
import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore('SettingStore',{
    state:() => {
        return {
            fold:false, // 用户控制菜单折叠还是收起控制
            refresh:false, // 用户是否点击刷新
        }
    }
})

export default useLayOutSettingStore;