// 统一管理用户管理模块相关的接口
import request from "../../../utils/request";

// 引入用户管理模块的数据类型
import type { UserInfoListResponseData, UserInfoData, AllRoleResponseData, AssignUserRoleData } from "./type";

// 项目用户管理模块相关的请求地址
enum API {
    // 获取全部已有用户账号信息
    GET_USER_LIST_URL = "/admin/acl/user/",
    // 添加用户
    ADD_USER_URL = "/admin/acl/user/save/",
    // 更新已有的用户
    UPDATE_USER_URL = "/admin/acl/user/update/",
    // 获取全部职位，当前账号拥有的职位
    ALL_ROLE_URL = "/admin/acl/user/toAssign/",
    // 给已有账号分配职位
    ASSIGN_ROLE_URL = "/admin/acl/user/doAssignRole/",
    // 删除某一个用户
    DELETE_USER_URL = "/admin/acl/user/remove/",
    // 批量删除用户
    DELETE_USER_BATCH_URL = "/admin/acl/user/batchRemove/",
    // 搜索用户
    SEARCH_USER_URL = "/admin/acl/user/search/",
    // 获取用户总数
    GET_USER_TOTAL_URL = "/admin/acl/user/getTotalCount/",

}

// 获取全部已有用户账号信息
export const reqGetUserInfo = (page:number, limit:number) => request.get<any, UserInfoListResponseData>(API.GET_USER_LIST_URL+`/${page}/${limit}`);

// 添加用户
export const reqAddOrUpdateUser = (data:UserInfoData) => {
    // 判断data中是否有id，如果有id，则是更新已有的用户，否则是添加用户
    console.log(data);
    if(data.id){
        return request.put<any, any>(API.UPDATE_USER_URL, data);
    }else{
        return request.post<any, any>(API.ADD_USER_URL, data);
    }
}

// 获取全部职位，当前账号拥有的职位
export const reqAllRole = (userId:number) => request.get<any, AllRoleResponseData>(API.ALL_ROLE_URL+`/${userId}`);

// 给已有账号分配职位
export const reqAssignUserRole = (data:AssignUserRoleData) => request.post<any, any>(API.ASSIGN_ROLE_URL, data);

// 删除某一个用户
export const reqDeleteUser = (userId:number) => request.delete<any, any>(API.DELETE_USER_URL+`/${userId}`);

// 批量删除用户
export const reqDeleteUserBatch = (idList:number[]) => request.delete<any, any>(API.DELETE_USER_BATCH_URL, {data:idList});

// 搜索用户
export const reqSearchUser = (data:any) => request.post<any, any>(API.SEARCH_USER_URL, data);

// 获取用户总数
export const reqGetUserTotal = () => request.get<any, any>(API.GET_USER_TOTAL_URL);


