export interface ResponseData{
    code:number,
    message:string,
    ok:boolean,
}

// 已有品牌的数据类型
// id? 加问号表示有可能有也有可能没有，代表新增和已有的情况
export interface TradeMark {
    id?:number,
    tmName:string,
    logoUrl:string,
}

// 包含全部品牌数据的ts类型
export type Records = TradeMark [];

// 获取的已有全部品牌的数据ts类型
export interface TradeMakrResponseData extends ResponseData{
    data:{
        records:Records,
        total:number,
        size:number,
        current:number,
        searchCount:boolean,
        pages:number,
    }
}