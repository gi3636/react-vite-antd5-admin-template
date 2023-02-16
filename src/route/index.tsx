import { Suspense } from 'react'; // Suspense的作用是「划分页面中需要并发渲染的部分」
import { Navigate, useRoutes } from 'react-router-dom';
import { routes } from '@/route/router';
import { USER_INFO } from '@/constant';
// 拦截
const RouterBeforeEach = (props: { route: any; children: any }) => {
  let userInfo = JSON.parse(localStorage.getItem(USER_INFO) || '{}');

  // 判断是否需要登录，没有token则跳转到登录页
  if (props?.route?.meta?.needLogin && !userInfo?.token) {
    return <Navigate to={'/login'} replace />;
  }

  return <Suspense>{props.children}</Suspense>;
};

// 渲染路由
const renderRoutes = (routes: any) => {
  return routes.map((item: any) => {
    const route: any = { meta: item.meta, path: item.path };
    if (item.component) {
      // element 要接收react.element类型 item.component 是对象 所以要转一下
      route.element = (
        <RouterBeforeEach route={item}>
          <item.component />
        </RouterBeforeEach>
      );
    }
    if (item.children) {
      console.log('item.children', item.children);
      route.children = renderRoutes(item.children);
    }
    if (item.redirect) {
      route.element = <Navigate to={item.redirect} />;
    }
    return route;
  });
};
export default function Router() {
  // useRoutes API 把路由数组整合为 <Router> <Route path="xx" element="xxx"></Route>等 </Router>的路由组件  直接用于BrowserRouter中
  return useRoutes(renderRoutes(routes));
}
