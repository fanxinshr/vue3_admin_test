// 分类相关的数据的TS类型

export interface ResponseData {
    code: number, // 状态码
    message: string, // 描述信息
    data: any // 数据
    ok: boolean // 布尔值
}

// 分类的TS类型
export interface Category {
    id: number | string, // 分类的ID
    name: string, // 分类的名称
    category1Id?: number, // 一级分类的ID
    category2Id?: number, // 二级分类的ID
}

// 分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
    data: Category[]
}

// 已有属性值与属性值对象的TS类型
// 新增的属性值，是没有id和attrId的
export interface Attr {
    id?: number, // 属性值的id
    valueName: string, // 属性值的名称  
    attrId?: number | string, // 属性id
    flag?: boolean // 控制数据编辑模式与展示模式的切换
}

// 存储每一个属性值的数组类型
export type AttrValueList = Attr[];

// 属性对象
export interface Attr {
    id?: number,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList: AttrValueList
}

// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[];

// 属性接口返回的数据类型
export interface AttrResponseData extends ResponseData {
    data: AttrList,

}