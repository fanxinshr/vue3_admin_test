<template>
  <div class="container">
    <svg style="height: 30px;width: 30px;">
      <!-- <use :x-link:href="#icon-phone"></use> -->
      <use :x-link:href="prefix+'phone'" :fill="color"></use>
    </svg>
  </div>
</template>
<script setup lang="ts" name="SvgIcon">
// import {ref,reactive} from "vue"
// 接收父组件传递过来的参数
defineProps({
  // xlink:href属性前缀
  prefix:{
    type:String,
    default:'#icon-'
  },
  // 提供使用的图标名字
  name:String,
  // 接收父组件传递的颜色
  color:{
    type:String,
    default:''
  }

})



</script>
<style lang="css" scoped>


</style>
