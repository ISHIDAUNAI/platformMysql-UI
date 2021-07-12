import React from 'react';
import { Menu, message, } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { getSystem, getRoleCodeList, setCurrentSystem } from '@/utils/token';
import {setAuthority} from "@/utils/authority";
import { history } from 'umi';

const LayoutSystem = () => {
  const list = getSystem();

  const onMenuClick = ({item}) => {
    const s = JSON.parse(item.node.dataset.system);

    if (s.showType === 'BLANK') {
      const win = window.open(s.blankPath, '_blank');
      win.focus();
      return ;
    }

    if (s.indexPath) {
      const authList = [];
      getRoleCodeList().forEach(code => {
        authList.push(s.resourceId + '_' + code)
      })
      setAuthority(authList);
      setCurrentSystem(s);

      history.replace('/');
    } else {
      message.error('系统暂未开放，敬请期待！');
    }
  };

  const menuHeaderDropdown = (systemList) => {
    return (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {
          systemList.map(data => {
            return (
              <Menu.Item key={data.id} data-system={JSON.stringify(data)}>
                <span role="img" className="anticon">
                  <img src={document.location.origin + data.icon} alt="icon" className="ant-pro-sider-menu-icon" />
                </span>
                {data.name}
              </Menu.Item>
            )
          })
        }
      </Menu>
    )
  };

  return (
    list.map(data => {
      return (
        <HeaderDropdown overlay={menuHeaderDropdown(data.systemList)} key={data.typeName}>
          <span className={`${styles.action} ${styles.account}`}>
            <span className={styles.name}> {data.typeName} </span>
          </span>
        </HeaderDropdown>
      )
    })
  )
}

export default LayoutSystem
