<template>
  <el-card style="margin-top: 20px;">
    <el-label style="margin-top: 20px;">业务审批追踪</el-label>
  </el-card>
    <!-- <el-divider style="width: 80%; margin: 0px 10px;" /> -->
    <div style="display: flex; justify-content: center;">
    <el-timeline style="width: 80%; margin-top: 20px;">
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>审批中</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top" style="margin-top: 20px;background-color: #f0f2f5;">
      <el-card style="background-color: #39E1B1;">
        <h4 style="display: flex; align-items: center;">
          <!-- <el-icon size="30" color="#409EFF">
             <Stamp />
          </el-icon> -->
          <span style="margin-left: 8px;">财务部审核通过</span>
          <el-icon size="30" color="#409EFF">
            <SuccessFilled />
          </el-icon>
        </h4>
        <el-divider />
        <p>王建国 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>补充材料</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>初审完成</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>文件入库</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>发起申请</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script setup lang="ts" name="Name">
// import {ref,reactive} from "vue"
// import { Stamp } from '@element-plus/icons-vue'


</script>
<style lang="scss" scoped>


</style>
