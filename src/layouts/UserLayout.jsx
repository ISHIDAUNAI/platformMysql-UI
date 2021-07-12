import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, connect } from 'umi';
import React from 'react';
import logo from '../assets/layout/logo.png';
import styles from './UserLayout.less';
import GlobalFooter from '@/components/layout/GlobalFooter'

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/user/login">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>沈阳智享大健康科技有限公司</span>
              </Link>
            </div>
            <div className={styles.desc}>共享智慧医疗 惠泽百姓健康</div>
          </div>
          {children}
        </div>
        <GlobalFooter />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
