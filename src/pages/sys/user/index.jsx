import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import moment from 'moment';
import {Card, List, Button, Avatar} from 'antd';
import {
  PlusOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  UserOutlined,
  PhoneOutlined,
  FieldTimeOutlined,
  ManOutlined,
  WomanOutlined,
  ApartmentOutlined,
  DeploymentUnitOutlined,
  PauseOutlined,
  CaretLeftOutlined,
} from '@ant-design/icons';
import styles from './index.less';

import Confirm from '@/components/common/Confirm';
import Search from './components/search';
import ModalForm from './components/form';
import ModalPasswordForm from './components/password';

const SysUser = (props) => {

  const {
    SysUserModel: { list, searchForm, modalVisible, modalPasswordVisible },
    loading,
    dispatch,
  } = props;

  // 分页
  const paginationProps = {
    ...{
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条` ,
      onChange: (page) => {
        dispatch({ type: 'SysUserModel/searchFormReducer', payload: {...searchForm, ...{current: page}}})
        dispatch({ type: 'SysUserModel/PageEffect', payload: {...searchForm, ...{current: page}}});
      },
      onShowSizeChange: (current, size) => {
        dispatch({ type: 'SysUserModel/searchFormReducer', payload: {...searchForm, ...{pageSize: size}}})
        dispatch({ type: 'SysUserModel/PageEffect', payload: {...searchForm, ...{pageSize: size}}});
      },
      size: 'small',
      showSizeChanger: true,
    },
    ...searchForm
  };

  // init
  useEffect(() => {  dispatch({ type: 'SysUserModel/PageEffect', payload: searchForm}); }, []);

  // 删除用户
  const handleRemove = (item) => {
    Confirm.delete({
      content: `<p>名称为 <span style="color: #f60"> ${item.realName} </span> 的用户将被删除</p><p>是否继续？</p>`,
      confirm: async () => {
        await dispatch({ type: 'SysUserModel/removeEffect', payload: item.id });
        dispatch({ type: 'SysUserModel/PageEffect', payload: searchForm});
      },
    });
  };

  // 停用用户
  const handlePause = (item) => {
    Confirm.sure({
      content: `停用用户： <span style="color: #f60"> ${item.realName} </span> `,
      confirm: async () => {
        await dispatch({ type: 'SysUserModel/pauseEffect', payload: item.id });
        dispatch({ type: 'SysUserModel/PageEffect', payload: searchForm});
      },
    });
  }

  // 启用用户
  const handleResume = (item) => {
    Confirm.sure({
      content: `启用用户： <span style="color: #f60"> ${item.realName} </span> `,
      confirm: async () => {
        await dispatch({ type: 'SysUserModel/resumeEffect', payload: item.id });
        dispatch({ type: 'SysUserModel/PageEffect', payload: searchForm});
      },
    });
  }

  // 新增用户
  const handleRaise = () => {
    dispatch({ type: 'SysUserModel/userReducer', payload: null });
    dispatch({ type: 'SysUserModel/changeVisibleReducer', payload: true });
  }

  // 修改用户
  const handleUpdate = (item) => {
    dispatch({ type: 'SysUserModel/userReducer', payload: item });
    dispatch({ type: 'SysUserModel/changeVisibleReducer', payload: true });
  };

  // 修改用户密码
  const handleUpdatePassword = (item) => {
    dispatch({
      type: 'SysUserModel/passwordFormReducer',
      payload: { id: item.id, realName: item.realName, password: null, oldPassword: null, newPassword: null, }
    });
    dispatch({ type: 'SysUserModel/changePasswordVisibleReducer', payload: true });
  }

  const extraContent = (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleRaise()}>
        新增
      </Button>
      {
        havePermission('auth_sys_user') ? (
          <>
            <Button type="primary" ghost icon={<VerticalAlignTopOutlined />} style={{marginLeft: 20,}} >
              导入
            </Button>
            <Button type="primary" ghost icon={<VerticalAlignBottomOutlined />} style={{marginLeft: 20,}} >
              导出
            </Button>
          </>
        ) : (null)
      }
    </div>
  );

  // 列表展示信息扩展
  const listDesc = (item) => (
    <div className={styles.listDesc}>
      <span className={styles.listSpan}> <UserOutlined /> {item.userName} </span>
      <span className={styles.listSpan}> <PhoneOutlined /> {item.phone} </span>
      <span className={styles.listSpan}> <FieldTimeOutlined /> {moment(item.birthday).format('YYYY-MM-DD') } </span>
      {
        item.sex === 'MAN' ?
          <span className={styles.listSpan}> <ManOutlined /> 男 </span> :
          <span className={styles.listSpan}> <WomanOutlined /> 女 </span>
      }
      {
        item.usedState === 'YES' ?
          <span className={styles.listSpan}> <PauseOutlined /> 启用 </span> :
          <span className={styles.listSpan}> <CaretLeftOutlined /> 停用 </span>
      }
    </div>
  )

  // 列表展示信息扩展
  const ListContent = (contentProps) => {
    const {user} = contentProps;
    const deptContent = user.deptList.map(dept => `${dept.name  }、 `);
    const roleContent = user.roleList.map(role => `${role.name  }、 `);

    return (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          {
            deptContent && deptContent.length ?
              ( <> <span><ApartmentOutlined /> 所属机构</span> <p>{deptContent}</p> </> ) : null
          }
        </div>
        <div className={styles.listContentItem}>
          {
            roleContent && roleContent.length ?
              ( <> <span><DeploymentUnitOutlined /> 用户角色</span> <p>{roleContent}</p> </> ) : null
          }
        </div>
      </div>
    );
  }

  return (
    <PageHeaderWrapper content='系统用户为拥有登录权限的用户，不同角色的用户拥有不同信息时，请扩展系统用户表。'>
      <Search />

      <Card
        bordered={false}
        title="用户列表"
        style={{
          marginTop: 24,
        }}
        extra={extraContent}
      >
        <List
          size="large"
          rowKey="id"
          pagination={paginationProps}
          dataSource={list}
          loading={loading}
          renderItem={item => (
            <List.Item
              actions={
                (
                  item.id === '1' ?
                  [
                    <Button icon={<KeyOutlined/>} type="link" onClick={() => handleUpdatePassword(item)}> 修改密码 </Button>,
                  ] : [
                    <Button icon={<EditOutlined/>} type="link" onClick={() => handleUpdate(item)}>编辑</Button>,
                    <Button icon={<DeleteOutlined/>} type="link" onClick={() => handleRemove(item)}>删除</Button>,
                    <Button icon={<KeyOutlined/>} type="link" onClick={() => handleUpdatePassword(item)}> 修改密码 </Button>,
                    (item.usedState === 'YES' ?
                      <Button icon={<CaretLeftOutlined/>} type="link" onClick={() => handlePause(item)}> 停用 </Button> :
                      <Button icon={<PauseOutlined/>} type="link" onClick={() => handleResume(item)}> 启用 </Button>
                    )
                  ]
                )
              }
            >
              <List.Item.Meta className={styles.listMeta}
                avatar={
                  item.photo ?
                    <img src={item.photo} alt="avatar" style={{ width: '45px', height: '45px' }}/> :
                    <Avatar icon={<UserOutlined/>} shape="square" size="large"/>
                }
                title={item.realName}
                description={listDesc(item)}
              />
              <ListContent user={item}/>
            </List.Item>
          )}
        />
      </Card>

      {modalVisible ? <ModalForm /> : null}
      {modalPasswordVisible ? <ModalPasswordForm /> : null}

    </PageHeaderWrapper>
  )
}

export default connect(({ SysUserModel, loading }) => ({
  SysUserModel,
  loading: loading.models.SysUserModel,
}))(SysUser);
