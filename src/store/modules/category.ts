// 商品分类全局状态管理
import { defineStore } from "pinia";
import { reqC1Category, reqC2Category, reqC3Category } from "../../api/product/attr";
import type { CategoryResponseData } from "../../api/product/attr/type";
import type { CategoryState } from "./types/types";
export const useCategoryStore = defineStore("Category", {
    // 定义状态
    state: (): CategoryState => {
        return {
            category1List: [],
            category1Id: '',
            category2List: [],
            category2Id: '',
            category3List: [],
            category3Id: ''
        }
    },
    // 定义方法
    actions: {
        // 获取一级分类
        async getCategory1List() {
            const result: CategoryResponseData = await reqC1Category()
            if (result.code == 200) {
                // 存储一级分类的数据
                this.category1List = result.data
                // this.category2List = []
                // this.category3List = []
            }
        },
        // 获取二级分类
        async getCategory2List(category1Id: number) {
            const result: CategoryResponseData = await reqC2Category(Number(category1Id))
            if (result.code == 200) {
                // 存储二级分类的数据
                this.category2List = result.data
            }
        },
        // 获取三级分类的数据
        async getCategory3List(category2Id: number) {
            const result: CategoryResponseData = await reqC3Category(Number(category2Id))    
            if (result.code == 200) {
                // 存储三级分类的数据
                this.category3List = result.data
            }
        }
    },
    // 定义getters
    getters: {
        // 获取一级分类的名称
        getCategory1NameById(state){
            return (id:number|string)=>{
                const result = state.category1List.find((item:any)=>item.id == id)
                return result?.name
            }
        },
        // 获取二级分类的名称
        getCategory2NameById(state){
            return (id:number|string)=>{
                const result = state.category2List.find((item:any)=>item.id == id)
                return result?.name
            }
        },
        // 获取三级分类的名称
        getCategory3NameById(state){
            return (id:number|string)=>{
                const result = state.category3List.find(item=>item.id == id)
                return result?.name
            }
        }   
    }


})