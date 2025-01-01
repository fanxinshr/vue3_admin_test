// 账号信息的ts的数据类型
export interface UserInfoResponseData {
    code: number;
    message: string;
    ok: boolean;
}

// 一个账号信息的数据类型
export interface UserInfoData {
    id?: number;
    createTime?: string;
    updateTime?: string;
    username?: string;
    password?: string;
    name?: string;
    phone?: string;
    roleName?: string;
}
// 数组包含全部的账号信息
export type UserInfoList = UserInfoData[];


// 获取全部用户信息接口的返回数据类型
export interface UserInfoListResponseData extends UserInfoResponseData {
    data: {
        records: UserInfoList;
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    }
}

// 一个职位数据类型
export interface RoleData {
    id?: number;
    roleName?: string;
    createTime?: string;
    updateTime?: string;
    remark?: null;
}

// 数组包含全部的职位数据
export type AllRoleList = RoleData[];

// 获取全部职位的接口返回的数据ts类型，当前账号拥有的职位
export interface AllRoleResponseData extends UserInfoResponseData {
    data:{
        allRolesList: AllRoleList;
        assignRoles: AllRoleList;
    }
}

// 给已有账号分配职位接口的参数ts类型
export interface AssignUserRoleData {
    userId: number;
    roleIdList: number[];
}

