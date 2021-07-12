import {routeList} from '@/services/sys/resource';

const context = require.context('', true, /^\.\/pages\/.*\.jsx$/);

const menuFormatter = menuList => {
  menuList.forEach(item => {
    try {
      if (item.icon) {
        // eslint-disable-next-line no-param-reassign
        item.icon = document.location.origin + item.icon;
      }

      if (item.component) {
        // eslint-disable-next-line no-param-reassign
        item.component = context(`./pages${item.component}/index.jsx`).default
      }

      if (item.routes) {
        // eslint-disable-next-line no-param-reassign
        item.routes = menuFormatter(item.routes);
      }
    } catch (e) {
      console.info(e)
    }
  })

  return menuList;
}

let homeRouteList;
let screenRouteList;

export function patchRoutes(routes) {
  screenRouteList.forEach(route => {
    routes.routes[0].routes.unshift(route)
  })

  homeRouteList.forEach(route => {
    routes.routes[0].routes[routes.routes[0].routes.length - 1].routes.unshift(route)
  })
}

export async function render(initialValue) {
  const res = await routeList();
  if (res.isSuccess) {
    const extraRoutes = res.result

    homeRouteList = menuFormatter(extraRoutes.homeRouteList)
    screenRouteList = menuFormatter(extraRoutes.screenRouteList);

    initialValue();
  } else {
    window.location.href = '/user/login';
  }
}


/*
// 路由结构
const routeDataList = [
  {
    path: '/sys',
    icon: '/menu/sys/sys.png',
    name: '系统配置',
    authority: ['admin'],
    routes: [
      { name: '系统管理', icon: '/menu/sys/system.png', path: '/sys/system', component: '/sys/system', authority: ['admin'] },
      { name: '菜单管理', icon: '/menu/sys/menu.png', path: '/sys/menu', component: '/sys/menu', authority: ['admin'] },
      { name: '按钮权限', icon: '/menu/sys/button.png', path: '/sys/button', component: '/sys/button', authority: ['admin'] },
    ],
  },
  { name: '字典管理', icon: '/menu/sys/dict.png', path: '/sys/dict', component: '/sys/dict', authority: ['admin'], },
  { name: '定时任务', icon: '/menu/sys/task.png', path: '/sys/task', component: '/sys/task', authority: ['admin'], },
  { name: '机构部门', icon: '/menu/sys/dept.png', path: '/sys/dept', component: '/sys/dept', authority: ['admin'], },
  { name: '角色管理', icon: '/menu/sys/role.png', path: '/sys/role', component: '/sys/role', authority: ['admin'], },
  { name: '用户管理', icon: '/menu/sys/user.png', path: '/sys/user', component: '/sys/user', authority: ['admin'], },
]

routes.routes[0].routes.unshift(
  {
    path: '/home',
    component: context(`./pages/sys/home/index.jsx`).default,
    routes: [
    { name: '系统管理', icon: '/menu/sys/system.png', path: '/sys/system', component: context(`./pages/sys/system/index.jsx`).default,},
    { name: '菜单管理', icon: '/menu/sys/menu.png', path: '/sys/menu', component: context(`./pages/sys/menu/index.jsx`).default,},
    { name: '按钮权限', icon: '/menu/sys/button.png', path: '/sys/button', component: context(`./pages/sys/button/index.jsx`).default,}
    ],
  }
)

 */
