import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, } from 'antd';
import React, { useState } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import Confirm from '@/components/common/Confirm';
import { getUser, removeToken } from '@/utils/token';
import ModalUpdatePassword from './components/updatePassword';
import ModalUpdateInfo from './components/updateInfo';

const AvatarDropdown = () => {
  const [updatePasswordVisible, handleUpdatePasswordVisible] = useState(false);
  const [updateInfoVisible, handleUpdateInfoVisible] = useState(false);

  const currentUser = getUser();

  const event = {
    /**
     * 退出
     */
    logout : () => {
      Confirm.sure({
        content: '确定退出当前登录？',
        confirm: () => {
          removeToken();
          window.location.href = '/user/login';
        },
      });
    },
    /**
     * 修改密码
     */
    updatePassword : () => {
      handleUpdatePasswordVisible(true);
    },
    /**
     * 修改个人信息
     */
    updateInfo : () => {
      handleUpdateInfoVisible(true);
    },
  }

  const onMenuClick = ({key}) => {
    event[key]()
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="updateInfo"> <UserOutlined /> 个人信息 </Menu.Item>
      <Menu.Item key="updatePassword"> <SettingOutlined /> 修改密码 </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout"> <LogoutOutlined /> 退出登录 </Menu.Item>
    </Menu>
  );

  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {
            currentUser && currentUser.photo ?
              (<Avatar size="small" className={styles.avatar} src={currentUser.photo} alt="avatar" />):
              (<Avatar size="small" className={styles.avatar} icon={<UserOutlined />} alt="avatar" />)
          }
          <span className={styles.name}>用户名 : {currentUser.realName}</span>
        </span>
      </HeaderDropdown>

      {
        updatePasswordVisible ?
          <ModalUpdatePassword
            updatePasswordVisible={updatePasswordVisible}
            onCancel={() => handleUpdatePasswordVisible(false)}
          />
          : null
      }

      {
        updateInfoVisible ?
          <ModalUpdateInfo
            updateInfoVisible={updateInfoVisible}
            onCancel={() => handleUpdateInfoVisible(false)}
          />
          : null
      }
    </>
  );
}

export default AvatarDropdown;
