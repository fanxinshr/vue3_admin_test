import type { RouteRecordRaw } from "vue-router";
import type { Category } from "../../../api/product/attr/type";

// 定义小仓库数据state的类型
export interface UserState{
    token:string|null;
    menuRoutes:RouteRecordRaw[];
    username:string;
    avatar:string;
}

// 定义分类仓库state对象的TS类型
export interface CategoryState {
    category1Id: string | number
    category1List: Category[]
    category2Id: string | number
    category2List: Category[]
    category3Id: string | number
    category3List: Category[]
}

