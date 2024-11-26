<template>
    <div class="">
        <!-- 路由组件出口的位置 -->
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <!-- 渲染layout一级路由组件的子路由 -->
                <component :is="Component" v-if="flag" />
            </transition>
        </router-view>


    </div>
</template>
<script setup lang="ts" name="Main">
import { ref, reactive,nextTick } from "vue"
// 获取骨架的小仓库
import useLayOutSettingStore from "@/store/modules/setting";

// 控制当前组件是否销毁重建
let flag = ref(true)

let LayoutSettingStrore = useLayOutSettingStore();
// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过按钮
// 
import {watch} from 'vue'

watch(() => LayoutSettingStrore.refresh,()=>{
    // console.log(999);
    // 点击刷新按钮，路由组件需要销毁
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    })
    
})


</script>
<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;

}

.fade-enter-active {
    transition: all 1s;

}

.fade-enter-to {
    opacity: 1;

}
</style>
