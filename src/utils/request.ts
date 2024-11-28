import axios from 'axios'
import { ElMessage } from 'element-plus';

// 引入用户相关的仓库
import useUserStroe from '../store/modules/user';

// 对axios进行二次封装
// 利用axios对象的create犯法，创建axios实例
let request = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:5000
})

// 请求拦截器
// request实例添加请求与响应拦截器
request.interceptors.request.use((config) =>{
    // 获取用户相关的小仓库，获取仓库内部的token，登录成功之后携带给服务器
    let userStore = useUserStroe();
    console.log("token");
    
    console.log(userStore.token);

    if(userStore.token){
        config.headers.token = userStore.token
    }
    

    // config配置对象，headers属性请求头，经常给服务器端携带公共参数
    // 返回配置对象
    return config

});

// 响应拦截器
request.interceptors.response.use((response)=>{
    // 成功回调
    return response.data;
},(error)=>{
    // 失败的回调，一般处理http网络错误
    // 定义一个变量，存储网络错误信息
    let message = '';
    // let status = error.response.status;
    let status = error.code;
    switch(status){
        case 401:
            message="token过期"
            break;
        case 403:
            message="无权访问"
            break;
        case 404:
            message="请求地址错误"
            break;
        case 500:
            message="服务器宕机"
            break;
        default:
            message="网络错误"
    }
    // 提示错误信息
    ElMessage({
        type:'error',
        message
    })

    return Promise.reject(error)

});

// 对外暴露
export default request