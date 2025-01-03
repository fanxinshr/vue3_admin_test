<template>
    <div class="container">
        <!-- <h1>轮播图展示</h1> -->
        <el-carousel indicator-position="outside" style="width: 50%; height: 500px;">
            <el-carousel-item v-for="item in 3" :key="item">
                <el-image :src="imgs[item - 1]" style="width: 100%; height: 100%;" />
            </el-carousel-item>
        </el-carousel>

        <el-carousel indicator-position="outside" style="width: 50%; height: 500px; margin-left: 20px;">
            <el-carousel-item v-for="item in 2" :key="item">
                <el-image :src="imgs0[item - 1]" style="width: 100%; height: 100%;" />
            </el-carousel-item>
        </el-carousel>

        <el-carousel indicator-position="outside" style="width: 50%; height: 500px; margin-left: 20px;">
            <el-carousel-item v-for="item in 2" :key="item">
                <el-image :src="imgs00[item - 1]" style="width: 100%; height: 100%;" />
            </el-carousel-item>
        </el-carousel>

        <!-- <el-image :src="imgs[0]" style="width: 100%; height: 100%;" />
        <el-image :src="imgs[1]" style="width: 100%; height: 100%;" />
        <el-image :src="imgs[2]" style="width: 100%; height: 100%;" /> -->

    </div>
</template>
<script setup lang="ts" name="Name">
import img1 from '@/assets/images/test/test3/1.png'
import img2 from '@/assets/images/test/test3/2.png'
import img3 from '@/assets/images/test/test3/3.png'

import img01 from '@/assets/images/test/test3/111.png'
import img02 from '@/assets/images/test/test3/222.png'

import img001 from '@/assets/images/test/test4/1.png'
import img002 from '@/assets/images/test/test4/2.png'


const imgs = [img1, img2, img3]

const imgs0 = [img01, img02]

const imgs00 = [img001, img002]

</script>
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-between;
}


.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
