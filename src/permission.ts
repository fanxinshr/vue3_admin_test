// 路由鉴权
// 项目当中的路由能否被访问的权限的限制
// 某一个路由，什么条件可以访问，什么条件不可以访问
import router from './router';

// 引入进度条
import nprogress from 'nprogress';
// 引入进度条的样式
import "nprogress/nprogress.css"

// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStroe from './store/modules/user';
import pinia from './store';
// import path from 'path';
import setting from './setting';

let userStore = useUserStroe(pinia);

// 全局守卫 项目当中任意路由切换都会触发的钩子


// 全局前置守卫
router.beforeEach(async(to:any, from:any, next:any) => {
    console.log(from);
    // 修改tab页标题
    document.title = setting.title + '-' +to.meta.title
    nprogress.start();
    // 访问某个路由之前的的守卫
    console.log('111 in permission.ts in router.beforeEach');
    // 获取token，判断用户登录还是未登录
    let token = userStore.token;
    console.log('token in permission.ts is ',token);
    
    // 获取用户的名字
    let username = userStore.username;
    console.log('username in permission.ts is ',username);
    
    if(token){
        // 登录成功，访问login，不能访问，指向首页
        if(to.path == '/login'){
            next({path:'/'})
        } else {
            // 访问其他的6个url，放行
            
            if(username){
                // 有用户信息
                next();
            }else{
                // 没有用户信息
                // 在守卫的地方，发送请求，获取到了用户信息再放行
                try{
                    // 获取用户信息
                    await userStore.userInfo();
                    // 放行
                    next();
                }catch(error){
                    // token过期，获取不到用户信息，用户手动修改了本地存储的token
                    // 退出登录，清空用户相关的数据
                    // userStore.useLogout();
                    // 回到登录页面
                    next({path:'/login'})


                }
                
            }
            
        }

    } else {
        // 用户未登录,跳转到login页面
        if(to.path == '/login'){
            next();
        }
        else {
            next({path:'/login',query:{redirect: to.path}});
        }

    }
    // next();

})

// 全局后置守卫
router.afterEach((to:any, from:any) => {
    console.log(to);
    console.log(from);
    console.log("222 in permission.ts in router.afterEach ");
    nprogress.done()
})

