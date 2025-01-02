<template>
  <div class="">
    <el-card>
      <h1>测试1</h1>
    </el-card>

    <!-- 表格展示 -->
    <el-card style="margin-top: 20px;">
    <ag-grid-vue :rowData="rowData" :columnDefs="colDefs" style="height: 500px" class="ag-theme-quartz">
    </ag-grid-vue>
  </el-card>

  </div>
</template>
<script setup lang="ts" name="Name">
import {ref} from "vue"

// 引入ag-grid组件
import { AgGridVue } from "ag-grid-vue3";// Vue Data Grid Component

// 引入ag-grid样式
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

// 表格数据
const rowData = ref([
   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
   { make: "Ford", model: "F-Series", price: 33850, electric: false },
   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
 ]);

// 表格列配置
 // Column Definitions: Defines the columns to be displayed.
 const colDefs = ref([
   { field: "make" },
   { field: "model" },
   { field: "model" },
   { field: "price" },
   { field: "price" },
   { field: "price" },
   { field: "electric" }
 ]);


</script>
<style lang="scss" scoped>


</style>
