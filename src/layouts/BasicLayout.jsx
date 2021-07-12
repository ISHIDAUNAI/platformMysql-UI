/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Link, connect, Redirect, history } from 'umi';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/layout/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/layout/logo.png';
import GlobalFooter from '@/components/layout/GlobalFooter'
import { Menu } from 'antd';
import styles from './BasicLayout.less';
import { getAccessToken, getIsGuide, getCurrentSystem } from '@/utils/token';

import {
  HomeOutlined,
} from '@ant-design/icons';

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const BasicLayout = props => {
  // 如果未登录，返回登录页面
  if (getAccessToken() === '') return <Redirect to='/user/login' />;

  const {
    children,
    settings,
    location = { pathname: '/', },
  } = props;

  const currentSystem = getCurrentSystem();

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  const goGuide = () => {
    history.replace('/guide');
  }

  const guideRender = () => {
    const isGuide = getIsGuide();
    if (isGuide === 'NO') {
      return false;
    } else {
      return (
        <Menu
          theme="dark"
          onSelect={goGuide}
        >
          <Menu.Item icon={<HomeOutlined />} key="home">站点首页</Menu.Item>
        </Menu>
      )
    }
  }

  return (
    <ProLayout
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          <h1>
            共享智慧医疗 惠泽百姓健康 {currentSystem ? ` —— ${  currentSystem.name}` : null}
          </h1>
        </Link>
      )}
      location={location}
      logo={logo}
      {...settings}
      disableContentMargin
      rightContentRender={() => <RightContent />}
      layout="topmenu"
    >
      <ProLayout
        headerRender={false}
        collapsedButtonRender={false}
        logo={logo}
        menuHeaderRender={guideRender}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        // breadcrumbRender={(routers = []) => [
        //   { path: '/', breadcrumbName: '首页', },
        //   ...routers,
        // ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => <GlobalFooter />}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority}>
          {children}
        </Authorized>
      </ProLayout>
    </ProLayout>
  );
};

export default connect(({ settings }) => ({
  settings,
}))(BasicLayout);
