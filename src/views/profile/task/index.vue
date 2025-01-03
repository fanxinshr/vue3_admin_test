<template>
  <div class="">
    <el-card class="info-card">
      <div class="info-section">
        <div class="info-group">
          <div class="info-label">
            <el-icon><User /></el-icon>
            <el-label style="margin-right: 10px;width: 100px;">任务名称</el-label>
            <el-input placeholder="请输入任务名称" />
          </div>
          <div class="info-button">
          <el-button type="primary" @click="addTask">添加任务</el-button>
          <el-button type="primary" @click="searchTask">检索任务</el-button>
        </div>
        </div>
      </div>
    </el-card>

    <el-card class="info-card">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="任务名称" />
            <el-table-column prop="description" label="任务描述" />
            <el-table-column prop="status" label="任务状态" />
            <el-table-column prop="createdAt" label="创建时间" />
            <el-table-column prop="updatedAt" label="更新时间" />
        </el-table>
    </el-card>
  </div>

</template>
<script setup lang="ts" name="Name">
import {ref} from "vue"

const tableData = ref([
    {
        name: '任务1',
        description: '任务描述1',
        status: '进行中',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
    },
    {
        name: '任务2',
        description: '任务描述2',
        status: '已完成',
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02'
    },
    {
        name: '任务3',
        description: '任务描述3',
        status: '未开始',
        createdAt: '2024-01-03',
        updatedAt: '2024-01-03'
    }
])

const addTask = () => {
    console.log('添加任务')
}

const searchTask = () => {
    console.log('检索任务')
}

</script>
<style lang="scss" scoped>
.info-card{
    margin-top: 20px;
}
.info-section{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.info-group{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
}
.info-label{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}
</style>
