// 创建用户相关的小仓库
import { defineStore } from "pinia";

// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from "../../api/user";
// 引入数据类型
// import type { loginForm } from "@/api/user/type";
import type { UserState } from "./types/types";

// 引入操作本地存储的文件
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "../../utils/token";
// 引入路由(常量路由)
import { constantRoute } from "../../router/routes";


import { loginFormData, loginResponseData, userInfoResponseData } from "../../api/user/type";
// import type { loginFormData, loginResponseData,userInfoResponseData } from "./type";
// 

// 创建用户小仓库
let useUserStroe = defineStore('User', {
    // 小仓库，存储数据的地方
    state: (): UserState => {
        return {
            // token:localStorage.getItem("TOKEN"),//用户的唯一表示token
            token: GET_TOKEN(),//用户的唯一表示token
            menuRoutes: constantRoute,//仓库存储生成菜单需要数组(路由)
            username: '',
            avatar: '',
        }
    },
    // 异步，逻辑的地方
    actions: {
        // 用户登录的方法
        // 接收用户传过来的参数
        // async userLogin(data:loginForm){
        async userLogin(data: loginFormData) {
            // console.log("calling userLogin function in user.ts store");
            // console.log("data is ", data);
            // 登录请求
            // let result:loginResponseData = await reqLogin(data);
            let result: loginResponseData = await reqLogin(data);
            // console.log("result is ", result);
            // 登录请求 成功200 -> token
            // 登录请求 失败201 -> 登录失败错误的信息
            if (result.code == 200) {
                // pinia仓库存储token
                // 由于pinia vuex存储数据其实利用js对象
                this.token = (result.data as string);
                // 本地存储持久化
                // localStorage.setItem("TOKEN",(result.data.token as string));
                SET_TOKEN((result.data as string))
                // 保证当前async函数返回一个成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))

            }

        },
        async userInfo() {
            // console.log(123);
            // 获取用户的信息存储到仓库之中
            let result: userInfoResponseData = await reqUserInfo()
            // console.log("result is ",result);
            // 如果获取用户信息成功，存储一下用户的个人信息
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                // this.username = result.data.checkUser.username;
                // this.avatar = result.data.checkUser.avatar;
                return 'OK';
            } else {
                // return Promise.reject('获取用户信息失败')
                return Promise.reject(new Error(result.message));

            }
        },
        async useLogout() {
            // 通知服务器本次用户唯一标识失效
            let result: any = await reqLogout();
            console.log(result);
            if (result.code == 200) {
                this.token = "";
                this.username = "";
                this.avatar = "";

                // localStorage.removeItem('TOKEN')
                REMOVE_TOKEN();
                return 'ok';
            } else {
                return Promise.reject(new Error(result.messages));
            }

        }


    },
    getters: {

    }

})
// 对外暴露获取小仓库的方法
export default useUserStroe;