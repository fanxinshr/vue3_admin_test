// 对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        // 登录路由
        path:'/login',
        component: () => import('@/views/login/index.vue'),
        name:'login', //命名路由
        meta:{
            title:'登录', //菜单标题
            hidden:true, //代表路由标题在菜单中是否隐藏
            icon:"Avatar",//菜单文字左侧的图标，支持element-plus所有的图标
        }
    },
    
    {
        // 登录成功以后，展示数据的路由
        path:'/',
        component: () => import('@/layout/index.vue'),
        // component:()=>import('@/views/home/index.vue'),
        name:'layout', //命名路由
        meta:{
            title:'', //菜单标题
            hidden:true, //代表路由标题在菜单中是否隐藏
            icon:"",
        },
        redirect: "/home",
        children:[
            {
                path:'/home',
                component:() => import('@/views/home/index.vue'),
                meta:{
                    title:'首页', //菜单标题
                    hidden:false,
                    icon:"House"
                }
            },
            // {
            //     path:'/test',
            //     component:()=>import('@/views/home/index.vue'),
            //     meta:{
            //         title:'测试', //菜单标题
            //         hidden:false,
            //         icon:"Document"
            //     }
            // },

        ]
    },
    {
        // 404
        path:'/404',
        component: () => import('@/views/404/index.vue'),
        name:'404', //命名路由
        meta:{
            title:'404', //菜单标题
            hidden:true,
            icon:"Failed",
        }
    },
    {
        // screen
        path:'/screen',
        component: () => import('@/views/screen/index.vue'),
        name:'Screen', //命名路由
        meta:{
            title:'数据大屏', //菜单标题
            hidden:false,
            icon:"Monitor",
        }
    },
    {
        // screen
        path:'/acl',
        component: () => import('@/layout/index.vue'),
        name:'Acl', //命名路由
        meta:{
            title:'权限管理', //菜单标题
            hidden:false,
            icon:"Discount",
        },
        redirect: "/acl/user",
        children:[
            {
                path:'/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name:"User",
                meta:{
                    title:'用户管理', //菜单标题
                    hidden:false,
                    icon:"User",
                }
            },
            {
                path:'/acl/role',
                component:() => import('@/views/acl/Role/index.vue'),
                name:"Role",
                meta:{
                    title:'角色管理', //菜单标题
                    hidden:false,
                    icon:"UserFilled",
                }
            },
            {
                path:'/acl/permission',
                component:() => import('@/views/acl/Permission/index.vue'),
                name:"Permission",
                meta:{
                    title:'菜单管理', //菜单标题
                    hidden:false,
                    icon:"Tools",
                }
            },
        ]

    },
    {
        // screen
        path:'/product',
        component:()=>import('@/layout/index.vue'),
        name:'Product', //命名路由
        meta:{
            title:'商品管理', //菜单标题
            hidden:false,
            icon:"Goods",
        },
        redirect: "/product/trademark",
        children:[
            {
                path:'/product/trademark',
                component:()=>import('@/views/product/trademark/index.vue'),
                name:"Trademark",
                meta:{
                    title:'品牌管理', //菜单标题
                    hidden:false,
                    icon:"ShoppingCart"
                }
            },
            {
                path:'/product/attr',
                component:()=>import('@/views/product/attr/index.vue'),
                name:"Attr",
                meta:{
                    title:'属性管理', //菜单标题
                    hidden:false,
                    icon:"UserFilled"
                }
            },
            {
                path:'/product/spu',
                component:()=>import('@/views/product/spu/index.vue'),
                name:"Spu",
                meta:{
                    title:'Spu管理', //菜单标题
                    hidden:false,
                    icon:"Tickets",
                }
            },
            {
                path:'/product/sku',
                component:()=>import('@/views/product/sku/index.vue'),
                name:"Sku",
                meta:{
                    title:'Sku管理', //菜单标题
                    hidden:false,
                    icon:"Moon",
                }
            },
            {
                path:'/product/test',
                component:()=>import('@/views/product/test/index.vue'),
                name:"Sku",
                meta:{
                    title:'test管理', //菜单标题
                    hidden:false,
                    icon:"Moon",
                }
            },
        ]
    },
    {
        // 任意路由
        path:'/:pathMatch(.*)*',
        redirect:'404',
        name:'Any',
        meta:{
            title:'任意路由', //菜单标题
            hidden:true,
            icon:"Reading",
        }
    }
]