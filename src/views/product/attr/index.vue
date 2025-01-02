<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />

    <el-card style="margin-top: 20px;">
      <!-- 展示已有的属性列表 -->
      <div v-show="scene == 0">
        <el-button type="primary" icon="Plus" size="default" :disabled="!categoryStore.category3Id"
          @click="AddAttrHandler">添加属性</el-button>

        <el-table :data="attrList" style="width: 100%; margin-top: 20px;">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="属性名称" width="320" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" prop="attrValueList[0].valueName">
            <!-- 插槽 -->
            <template #default="scope">
              <!-- 遍历属性值列表 -->
              <el-tag style="margin: 5px;" v-for="item in scope.row.attrValueList" :key="item.id" type="success"
                size="small">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <!-- 插槽 scope.row 当前行数据 属性对象 -->
            <template #default="scope">
              <!-- 修改属性按钮 row就是已有的属性对象 -->
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(scope.row)"></el-button>
              <!-- 删除属性按钮 row就是已有的属性对象 -->
              <!-- <el-button type="primary" size="small" icon="Delete" @click="deleteAttr(scope.row)"></el-button> -->
              <!-- 使用el-popconfirm组件，弹出确认框 -->
              <el-popconfirm :title="`确定要删除${scope.row.attrName}吗？`" @confirm="deleteAttr(scope.row)"
                @cancel="cancelHandler">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 展示添加与修改的卡片 -->
      <div v-show="scene == 1">
        <!-- 展示添加与修改的卡片 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" size="default" @click="addAttrValueHandler"
          :disabled="!attrParams.attrName">添加属性值</el-button>
        <el-button type="primary" size="default" @click="cancelHandler">取消</el-button>

        <el-table border style="width: 100%; margin-top: 20px; margin-bottom: 20px;" :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" width="80" align="center" prop="id"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="scope">
              <!-- 使用v-model双向绑定 -->
              <!-- row即为当前属性值对象 -->
              <!-- 使用ref获取input组件实例 -->
              <el-input :ref="(vc: any) => inputArr[scope.$index] = vc" v-if="scope.row.flag"
                @blur="changeToLookMode(scope.row, scope.$index)" v-model="scope.row.valueName"
                placeholder="请输入属性值名称"></el-input>
              <div v-else style="background-color: #f5f7fa;" @click="changeToEditMode(scope.row, scope.$index)">{{
                scope.row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" width="180">
            <template #default="scope">
              <el-button type="primary" size="small" icon="Delete"
                @click="attrParams.attrValueList.splice(scope.$index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" size="default" @click="saveAttrHandler"
          :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
        <el-button type="primary" size="default" @click="cancelHandler">取消</el-button>

      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Name">
// 组合式API函数watch
import { reactive, watch, nextTick, ref, onMounted, onBeforeUnmount } from "vue";

// 引入属性管理模块的接口
// import { reqAttr, reqC1Category, reqC2Category, reqC3Category, reqAddOrUpdateAttr, reqDeleteAttr } from "@/api/product/attr";
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from "../../../api/product/attr";
import type { AttrResponseData, Attr, AttrValue } from "../../../api/product/attr/type";


// import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useCategoryStore } from "../../../store/modules/category";

// 获取属性列表,存储一级分类的数据
const attrList = ref<Attr[]>([])

// 定义一个变量，用于控制卡片组件的内容切换
const scene = ref<number>(0); // 0 表示显示table 1表示展示添加与修改的卡片

// 准备一个数组，将来存储对应的组件实例el-input
const inputArr = ref<any>([])

// 定义一个变量，用于控制数据编辑模式与展示模式的切换
// const flag = ref<boolean>(true);

// 定义一个变量，用于存储当前选中的属性对象
const currentAttr = ref<Attr | null>(null)

// 收集新增的属性值的数据
let attrParams = reactive<Attr>({
  attrName: '', // 属性名称
  attrValueList: [], // 属性值列表
  categoryId: '', // 三级分类的ID
  categoryLevel: 3, // 归于哪个分类级别
})

// 获取store中的categoryStore
const categoryStore = useCategoryStore()

// 组件挂载完毕后，获取属性列表
onMounted(async () => {
  // 获取一级分类的数据
  // getC1Category();

})

// 组件卸载前，清空数据
onBeforeUnmount(() => {
  // 清空数据
  attrParams.attrName = ''
  attrParams.attrValueList = []
  // 清空仓库中的数据
  categoryStore.category1Id = ''
  categoryStore.category2Id = ''
  categoryStore.category3Id = ''

  categoryStore.$reset();
})

// 获取一级分类的方法
// const getC1Category = async ()=>{
//   const result:any = await reqC1Category()
//   if(result.code == 200){
//     attrList.value = result.data
//   } else {
//     ElMessage.error(result.message)
//   }
// }

// // 使用自定义的request实例
// onMounted(async ()=>{
//   const result = await reqAttrList2()
//   attrList2.value = result.data
// })

// 监听仓库对象三级分类的id category3Id的变化
watch(() => categoryStore.category3Id, async (newVal) => {
  if (!newVal) {
    return
  }
  // 监听到三级分类的变化，获取属性列表
  getAttr()

})

// 监听仓库对象一级分类的id category1Id的变化
watch(() => categoryStore.category1Id, async (newVal) => {
  if (!newVal) {
    return
  }
  // 监听到一级分类的变化，清空属性列表
  attrList.value = []
})



// 获取已有的属性值与属性值方法
const getAttr = async () => {
  // 解构仓库中的数据，从仓库中获取数据
  const { category1Id, category2Id, category3Id } = categoryStore
  // 调用接口，获取属性列表
  const result: AttrResponseData = await reqAttr(category1Id, category2Id, category3Id)

  if (result.code == 200) {
    // 存储属性列表到变量中，该变量是响应式的，绑定到页面中，页面会自动更新
    attrList.value = result.data
    console.log(attrList.value);

  } else {
    ElMessage.error(result.message)
  }
}

// 添加属性按钮的回调函数
const AddAttrHandler = () => {
  // 切换卡片组件的内容
  scene.value = 1;
  // 点击添加属性按钮的时候，收集新增属性的三级分类的id
  attrParams.categoryId = categoryStore.category3Id
}

// 修改属性按钮的回调函数
const updateAttr = (row: Attr) => {
  console.log(row);
  
  // 存储当前选中的属性对象
  currentAttr.value = row
  // 切换卡片组件的内容
  scene.value = 1
  console.log(row);
  // 将当前选中的属性对象的属性值列表赋值给attrParams.attrValueList
  // attrParams.attrValueList = row.attrValueList
  // // 将当前选中的属性对象的属性名称赋值给attrParams.attrName
  // attrParams.attrName = row.attrName
  // // 将当前选中的属性对象的id赋值给attrParams.id
  // // 有Id的情况下，表示修改已有的属性
  // attrParams.id = row.id

  // 浅拷贝有bug，使用深拷贝
  // attrParams.attrValueList = JSON.parse(JSON.stringify(row.attrValueList))
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));

}

// 根据已有属性的id来删除属性按钮的回调函数
const deleteAttr = async (row: Attr) => {
  // console.log(row);
  // 调用接口，删除属性
  const result = await reqDeleteAttr(Number(row.id))
  if (result.code == 200) {
    ElMessage.success(result.message)
    // 再次获取剩余的获取属性列表
    getAttr()
  } else {
    ElMessage.error("删除属性失败")
  }


}

// 取消按钮的回调函数
const cancelHandler = () => {
  scene.value = 0
  // 清空数据
  attrParams.attrName = ''
  attrParams.attrValueList = []
}

// 添加属性值按钮的回调函数
const addAttrValueHandler = () => {
  // 点击添加属性值按钮的时候，向数组添加一个属性值对象
  // console.log(attrParams);
  // 添加属性值
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, // 控制每一个属性值的数据编辑模式与展示模式的切换
  });
  // 获取input组件实例,聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  })


}

// 保存属性按钮的回调函数
const saveAttrHandler = async () => {
  // 收集参数，发送请求
  // 收集三级分类的id
  attrParams.categoryId = categoryStore.category3Id
  console.log(attrParams);
  // 发送请求
  let result:any = await reqAddOrUpdateAttr(attrParams)
  // 判断请求是否成功，成功则清空数据，切换场景
  if (result.code == 200) {
    ElMessage.success(result.message)
    // 清空数据
    attrParams.attrName = ''
    attrParams.attrValueList = []
    // 切换场景
    scene.value = 0
    // 获取属性列表
    getAttr()

  } else {
    ElMessage.error(result.message)
  }

}

// 属性值表单元素失去焦点的方法
// 切换数据编辑模式与展示模式的回调函数
const changeToLookMode = (row: AttrValue, index: number) => {

  console.log(index);

  // 判断属性值是否为空
  if (row.valueName.trim() == '') {
    ElMessage.error('属性值不能为空')
    // 删除对应属性值为空的属性值
    console.log(index);

    attrParams.attrValueList.splice(index, 1);
    return
  }

  // 不能输入相同的属性值
  const res = attrParams.attrValueList.find((item: AttrValue) => {
    console.log(item);
    // 切记把当前失去焦点的属性值对象排除在外
    if ( item.valueName != row.valueName) {
      return item.valueName == row.valueName;
    }
  })
  if (res) {
    attrParams.attrValueList.splice(index, 1);
    ElMessage.error('属性值不能相同')
    return
  }

  row.flag = false;
}

// 切换数据编辑模式与展示模式的回调函数
const changeToEditMode = (row: AttrValue, $index: number) => {
  row.flag = true;
  // 使用nextTick，等待DOM更新完成 
  // nextTick 是Vue提供的异步函数，等待DOM更新完成,响应式数据发生变化，获取更新的DOM(组件实例)
  nextTick(() => {
    // 获取input组件实例，聚焦
    inputArr.value[$index].focus();
  })
}

</script>
<style lang="scss" scoped></style>
