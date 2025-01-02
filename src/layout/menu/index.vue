<template>
    <!-- <h1>动态生成菜单</h1> -->
    <!-- <h1>{{ menuList }}</h1> -->
    <template v-for="(item) in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有，但是只有一个子路由 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由，且个数大于一个 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>


    </template>


</template>
<script setup lang="ts" name="Menu">
// import { Script } from "vm";
// import { ref, reactive } from "vue"
// import { useRoute } from "vue-router";

// 获取路由器对象
import { useRouter } from "vue-router";

// 获取父组件传递过来的全部路由数组
defineProps(['menuList']);

let $router = useRouter()

// 点击菜单的回调
const goRoute = (vc: any) => {
    console.log(vc);
    // vc.index 为跳转路径
    console.log($router);
    // 路由跳转
    $router.push(vc.index);
}

</script>

<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped>
h1 {
    color: white;
}
</style>
