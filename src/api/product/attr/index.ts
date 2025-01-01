// 这里是书写属性相关的API的
import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData } from "./type";

// 自定义的request实例
import request2 from "@/utils/request2";

// 属性管理模块接口地址,使用枚举类型
enum API {
    // 获取一级分类接口地址
    // 一级分类的地址
    C1_CATEGORY_URL = "/admin/product/getCategory1",
    // 二级分类的地址
    C2_CATEGORY_URL = "/admin/product/getCategory2",
    // 三级分类的地址
    C3_CATEGORY_URL = "/admin/product/getCategory3",
    // 获取分类下已有的属性值与属性列表
    ATTR_URL = "/admin/product/attrInfoList",
    // 添加或修改已有的属性的接口
    ADD_OR_UPDATE_ATTR_URL = "/admin/product/saveAttrInfo",
    // 删除属性
    DELETE_ATTR_URL = "/admin/product/deleteAttr/",
}

// 获取属性列表
// export const reqAttrList = ()=>request.get<any, any>(API.ATTR_LIST_URL)

// 获取一级分类的方法
export const reqC1Category = ()=>request.get<any, CategoryResponseData>(API.C1_CATEGORY_URL)

// 获取二级分类的方法
export const reqC2Category = (category1Id:number|string)=>request.get<any, CategoryResponseData>(API.C2_CATEGORY_URL+`/${category1Id}`)     

// 获取三级分类的方法
export const reqC3Category = (category2Id:number|string)=>request.get<any, CategoryResponseData>(API.C3_CATEGORY_URL+`/${category2Id}`  ) 

// 获取分类下已有的属性值与属性列表
export const reqAttr = (category1Id:number|string, category2Id:number|string, category3Id:number|string)=>request.get<any, AttrResponseData>(API.ATTR_URL+`/${category1Id}/${category2Id}/${category3Id}`)

// 添加或修改已有的属性的接口
export const reqAddOrUpdateAttr = (data:Attr)=>request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data)

// 删除属性
export const reqDeleteAttr = (attrId:number|string)=>request.delete<any, any>(API.DELETE_ATTR_URL+attrId)

// 使用自定义的request实例时的API接口地址
enum API2 {
    ATTR_LIST_URL = "/todos/",
}

// 使用自定义的request实例
export const reqAttrList2 = ()=>request2.get<any, any>(API2.ATTR_LIST_URL)
