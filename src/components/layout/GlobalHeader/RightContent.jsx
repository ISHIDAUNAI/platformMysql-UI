import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
import System from './System';

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar />

      <NoticeIconView />

      <System />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
