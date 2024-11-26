<template>
  <div class="test">
    <RouterView>
      
    </RouterView>
    <h2>App Root Vue</h2>
    <!--<br>
    <h4>Test test</h4>
    <el-button type="primary" size="small" :icon="Plus">添加{{ sum }}</el-button>
    <el-button type="success" size="small" :icon="Edit" >编辑{{ value1 }}</el-button>
    <el-button type="danger" size="small" :icon="Delete"></el-button>
    <el-button type="primary" size="small" :icon="Remove" @click=""></el-button> -->
    <!-- <el-switch v-model="value1" />
    <el-switch
      v-model="value2"
      class="ml-2"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    /> -->

    <!-- 日历
    <el-calendar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
    </el-calendar> -->
      
    <!-- <test></test> -->
    <!-- <br> -->
    <h1>SVG测试</h1>
    <!-- svg:图标外层容器节点，内部需要与use标签结合使用 -->
    <!-- <svg style="height: 30px;width: 30px;">
      <use x-link:href="#icon-phone"></use>
    </svg> --> 


    <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="yellow" />
    </svg> 

    <svg xmlns="http://www.w3.org/2000/svg">
      <use xlink:href="#sun" />
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg"> -->
      <!-- 👇 列挙された SymbolType enum 定数名を小文字化して、それで id セレクタ指定 -->
      <!-- <use xlink:href="#@(symbol.ToString().ToLower())" />
    </svg> -->
    
    <svg-icon name="phone"</svg-icon>
    <SvgIcon></SvgIcon>
    <test></test>

  </div>
</template>

<script setup lang="ts" name="Name">
  // 引入图标组件
  import { Plus,Edit, Delete, Remove } from "@element-plus/icons-vue";
  import {onMounted, ref} from "vue"
  import test from "./components/test.vue";

  import SvgIcon from './components/SvgIcon/index.vue'



  const value1 = ref(true)
  const value2 = ref(true)

  let sum = ref(12)

  console.log(sum.value);
  console.log(value2.value);

  import request from "./utils/request";
  import { log } from "console";

  import { reqLogin } from "./api/user";

  console.log("test");
  
  onMounted(()=>{
    console.log("onMounted...");
    
    reqLogin({
      username:"admin",
      password:"111111"
    })
  })


  // onMounted(()=>{
  //   request({
  //     url:'/user/login',
  //     method:'post',
  //     data:{
  //       username:'admin',
  //       password:'123456'
  //     }
  //   }).then(res => {
  //     console.log(res);
      
  //   })
  // })


</script>

<!-- <style lang="css" scoped>
  .is-selected {
    color: #1989fa;
  }

  svg, svg-icon {
  border: 1px solid black;
  }

</style> -->


<style lang="scss" scoped>
@import "./styles/index.scss";
div{
  h1{
    color: $base-color;
  }
}
</style>