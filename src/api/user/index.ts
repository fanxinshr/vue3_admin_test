// // 统一管理用户相关的接口
import request from "../../utils/request";
// import type { loginForm,loginResponseData,userResponseData } from "./type";

// enum API{
//     LOGIN_URL="/user/login",
//     USERINFO_URL="/user/info",
// }

// // 对外暴露请求函数
// // 登录的接口方法
// export const reqLogin = (data:loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
// // 获取用户信息接口方法
// export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL);

// 引入用户登录的数据类型
import type { loginFormData, loginResponseData,userInfoResponseData } from "./type";

// 项目用户相关的请求地址
enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout"
}

// 登录接口，携带参数
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data);

// 获取用户信息的接口
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL);

// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);

// 退出时，data内容为null，所以保持any类型不变