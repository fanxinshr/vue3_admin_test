// 品牌管理模块的接口
import request from "@/utils/request";
import type { TradeMakrResponseData, TradeMark } from "./type";

// 品牌管理模块接口地址
enum API {
    // 获取已有品牌接口
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    // 添加品牌
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
    // 修改已有品牌
    UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
    // 删除已有品牌
    // delete /admin/product/baseTrademark/remove/{id}
    DELTEETRADEMARK_URL = "/admin/product/baseTrademark/remove/",

}

// 获取已有品牌的接口方法
// page 获取第几页的 默认第一页
// limit 获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMakrResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

// 添加与修改已有品牌的接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    console.log("id in reqAddOrUpdateTrademark is ", data.id);

    if (data.id) {
        // 修改已有品牌的数据
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
    } else {
        // 新增品牌
        return request.post<any, any>(API.ADDTRADEMARK_URL, data);
    }
}

// 删除某个已有品牌的业务
export const reqDeleteTrademark = (id:number) => request.delete<any,any>(API.DELTEETRADEMARK_URL + `${id}`)

