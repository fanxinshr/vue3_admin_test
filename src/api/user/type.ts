// // 登录接口需要携带参数ts类型
// export interface loginForm {
//     // { username, password }
//     username: string,
//     password: string
// }

// interface dataType {
//     token?: string,
//     message?:string,
// }

// // 登录接口返回的数据类型
// // 登录的响应数据的数据类型
// export interface loginResponseData {
//     code: number,
//     data: dataType
// }

// // 定义用户
// interface userInfo {
//     userId: number,
//     avatar: string,
//     username: string,
//     password: string,
//     desc: string,
//     roles: string[],
//     buttons: string[],
//     routes: string[],
//     token: string,
// }

// interface user {
//     checkUser: userInfo
// }

// // 服务器返回用户信息相关的数据类型
// export interface userResponseData {
//     code: number,
//     data: user
// }


// 定义用户相关数据的ts类型
// 用户登录接口，携带参数的ts类型
export interface loginFormData{
    username:string,
    password:string
}

// 服务器返回的信息
// {
//   "code": 200,
//   "message": "成功",
//   "data": "eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSCjAK0A0Ndg1S0lFKrShQsjI0NzYxNDaxNDfUUSotTi3yTAGKQZh-ibmpQB2JKbmZeUq1ADBJ3jRBAAAA.I3PxwPkj3UcBkJtfdzD3GWPGIF3hmvPmPa3Tb-985i_L8BkREvYWg_x4aVNpzG4wXwuhDs0elkSJte-xJl1eGw",
//   "ok": true
// }

// 定义全部接口返回数据都拥有的ts类型
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

// 定义登录接口返回的类型
export interface loginResponseData extends ResponseData {
    data:string, //存储token
}

// 定义获取用户信息返回数据的类型
export interface userInfoResponseData extends ResponseData {
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string,
    }
}
