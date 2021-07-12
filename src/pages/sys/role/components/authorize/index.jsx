import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'umi';
import { Drawer, Button, Tree, } from 'antd';
import { list } from '@/services/sys/resource';
import { findRidByRole } from '@/services/sys/role/resource';
import {buildData} from "./util";
import {
  PoweroffOutlined,
  BlockOutlined,
  WindowsOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const DrawerAuthorize = (props) => {
  const {
    SysRoleModel: { authorizeVisible, role },
    dispatch,
  } = props;

  const [treeData, handleTreeData] = useState([]);
  const [checkedResourceId, handleCheckedResourceId] = useState([]);

  useEffect( () => {
    const lostData = async () => {
      const response = await list('BUTTON');
      handleTreeData(buildData(response.result))

      const res = await findRidByRole(role.id);
      handleCheckedResourceId(res.result)
    };

    lostData();
  }, []);

  const onCancel = () => {
    dispatch({ type: 'SysRoleModel/changeAuthorizeVisible', payload: false });
  };

  const handleAuth = async () => {
    await dispatch({ type: 'SysRoleModel/authEffect', payload: {roleId: role.id, rIds: checkedResourceId} });

    onCancel();
  }

  const checkResource = (checkedKeys, e) => {
    handleCheckedResourceId(checkedKeys.checked)
  }

  return (
    <Drawer
      width={300}
      className={styles.drawerAuthorize}
      getContainer={false}
      title={`${role ? role.name : ''} 角色授权`}
      onClose={onCancel}
      visible={authorizeVisible}
      footer={
        <Button type="primary" block onClick={() => handleAuth()}> 授 &nbsp;&nbsp;&nbsp;&nbsp; 权 </Button>
      }
    >
      <Tree
        onCheck={checkResource}
        checkedKeys={checkedResourceId}
        checkable={true}
        checkStrictly={true}
        selectable={false}
        treeData={treeData}
        showIcon={true}
        icon={(props) => {
          if (props.disabled) return ( <BarsOutlined /> )

          if (props.type === 'SYSTEM') return ( <WindowsOutlined /> );
          if (props.type === 'MENU') return ( <BlockOutlined /> );
          if (props.type === 'BUTTON') return ( <PoweroffOutlined /> );

          return null;
        }}
      />
    </Drawer>
  );
}

export default connect(({ SysRoleModel }) => ({
  SysRoleModel,
}))(DrawerAuthorize);
