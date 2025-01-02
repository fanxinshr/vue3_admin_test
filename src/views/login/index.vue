<template>
  <div class="login_container">
    <!-- <h1>我是一级路由--登录!!!</h1> -->
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>{{ getTime() }},尊贵的梅赛德斯车主</h1>
          <h2>Welcome to the login page</h2>

          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default"
              @click="login_function">ログイン</el-button>
          </el-form-item>

        </el-form>
      </el-col>

    </el-row>
  </div>
</template>
<script setup lang="ts" name="Name">
import { ref, reactive } from "vue";

// 引入路由
import { useRouter, useRoute } from "vue-router";

import { User, Lock } from '@element-plus/icons-vue';

import { ElNotification } from 'element-plus';

// 引入用户相关的小仓库
import useUserStroe from "../../store/modules/user";

// 引入获取当前时间的函数
import { getTime } from "../../utils/time";


let useStore = useUserStroe()

// 获取el-form组件
let loginForms = ref();


// 获取路由器
let $router = useRouter();
// 获取路由对象
let $route = useRoute();

// 定义变量控制按钮加载效果
let loading = ref(false)

// 收集账号与密码的数据
let loginForm = reactive({
  username: 'admin',
  password: '111111'
})

// 登录按钮的回调函数
const login_function = async () => {
  // 保证全部的表单项校验通过以后再发登录请求
  await loginForms.value.validate();

  // 加载效果:开始加载
  loading.value = true;
  // 点击按钮登录
  // 通知仓库发登录请求
  // 请求成功，跳转到首页，展示数据的地方
  // 请求失败，弹出登录失败的信息
  // console.log("hello");
  // console.log("loginForm is ", loginForm);
  // 调用pinia的函数，并传入用户的输入的用户名和密码
  try {
    // 可以书写。then语法
    await useStore.userLogin(loginForm);
    // 编程式导航跳转到数据展示的首页
    // 判断登录的时候，路由路径是否有query参数，如果有，则跳转到query参数，没有则跳转到首页
    let redirect:any = $route.query.redirect;
    $router.push({path:redirect||'/'})

    // 登录成功，加载效果也消失
    loading.value = false;

    // 登录成功的提示信息
    ElNotification({
      type: 'success',
      title: `Hi, ${getTime()}`,
      message: `欢迎登录,${loginForm.username}`,

    })
  } catch (error) {
    console.log("error");
    // 登录失败，加载效果消失
    loading.value = false;

    ElNotification({
      type: 'error',
      message: (error as Error).message
    })

  }

  // console.log(result);

}

// 定义表单校验需要配置的对象
// const rules = {
//   username:[
//     {
//       required:true, //代表字段必须要填
//       message:'用户名不能为空',
//       trigger:"blur"
//     },
//     {
//       required:true,
//       min:5,
//       max:10,
//       message:'用户名长度为5~10',
//       trigger:"change"
//     }
//   ],
//   password:[
//     {
//       required:true,
//       min:6,
//       max:10,
//       message:'密码长度为6~10位',
//       trigger:'change'
//     }
//   ]
// }

// 自定义校验规则函数
// const validatorUsername = ( rule: any, value: any, callback: any) => {
//   // rule:校验规则函数
//   // validate:表单元素文本内容
//   // 函数 如果符合条件callback放行通过即可
//   // 如果不符合条件，callback方法会注入错误提示信息
//   if (/^\d{4,10}$/.test(value)) {
//     callback();
//   } else {
//     callback(new Error("账号长度至少5位"))
//   }
//   // console.log(callback);
// }

// const validatorPassword = (rule: any, value: any, callback: any) => {
//   // rule:校验规则函数
//   // validate:表单元素文本内容
//   // 函数 如果符合条件callback放行通过即可
//   // 如果不符合条件，callback方法会注入错误提示信息

//   // if (/^\d{6,10}$/.test(value)) {
//   //   callback();
//   // } else {
//   //   callback(new Error("密码长度至少6位"))
//   // }
// }

// 用户自定义规则
const rules = {
  username: [
    {
      trigger: 'change',
      // validator: validatorUsername,
    }
  ],
  // password: [
  //   {
  //     trigger: 'change',
  //     validator: validatorPassword,
  //   }
  // ]
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100%;
  // background: url('@/assets/images/background.jpg') no-repeat;
  background: url('@/assets/images/blured-background-2048x1152.jpg') repeat;
  background-repeat: repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 60%;
    top: 30vh;
    bottom: 30vh;
    padding: 30px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;

    h1 {
      color: antiquewhite;
      font-size: 40px;
      font-family: 'Times New Roman', Times, serif;
    }

    h2 {
      font-size: 20px;
      color: aliceblue;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
