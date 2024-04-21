//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
import Home from '@/pages/Home'
import Search from '@/pages/Seaarch'
import Login from '@/pages/Login'
import Register from '@/pages/Register'


export const constantRouterMap = [
    {
        path: '/login',
        component: Login,
        // hidden: true
    },
    //重定向，定位至首页
    {
        path: "*",
        redirect: "/login"
    },
    {
        path: "/home",
        component: Home
    },
]

export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

// //配置路由
// export default new VueRouter({
//     mode: "history",
//     routes: [
//         {
//             path: "/home",
//             component: Home
//         },
//         {
//             path: "/search",
//             component: Search
//         },
//         {
//             path: "/login",
//             component: Login
//         },
//         {
//             path: "/register",
//             component: Register
//         },
//         //重定向，定位至首页
//         {
//             path: "*",
//             redirect: "/login"
//         },
//     ]
// })