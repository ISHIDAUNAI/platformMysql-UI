import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import styles from './index.less';
import { Card, List, Button, Typography } from 'antd';
import { PlusOutlined, TrademarkOutlined } from '@ant-design/icons';
import Confirm from '@/components/common/Confirm';
import ModalForm from './components/form';
import DrawerAuthorize from './components/authorize';

const { Paragraph } = Typography;

/**
 * 角色管理
 * 2020-03-06
 */
const SysRole = (props) => {
  const {
    SysRoleModel: { list, modalVisible, authorizeVisible },
    loading,
    dispatch,
  } = props;

  const headerContent = '系统角色管理，并且为角色分配系统权限。';

  // init
  useEffect(() => {
    dispatch({ type: 'SysRoleModel/listEffect' });
  }, []);

  /**
   * 新增
   */
  const handleRaise = () => {
    dispatch({ type: 'SysRoleModel/roleReducer', payload: null });
    dispatch({ type: 'SysRoleModel/changeVisibleReducer', payload: true });
  };

  /**
   * 修改
   * @param item item
   */
  const handleUpdate = (item) => {
    dispatch({ type: 'SysRoleModel/roleReducer', payload: item });
    dispatch({ type: 'SysRoleModel/changeVisibleReducer', payload: true });
  };

  /**
   * 删除
   * @param item item
   */
  const handleRemove = (item) => {
    Confirm.delete({
      content: `<p>名称为 <span style="color: #f60"> ${item.name} </span> 的角色将被删除</p><p>是否继续？</p>`,
      confirm: async () => {
        await dispatch({ type: 'SysRoleModel/removeEffect', payload: item.id });
        dispatch({ type: 'SysRoleModel/listEffect' });
      },
    });
  };

  const handleAuthorize = (item) => {
    dispatch({ type: 'SysRoleModel/roleReducer', payload: item });
    dispatch({ type: 'SysRoleModel/changeAuthorizeVisible', payload: true });
  }

  // 角色操作事件，如果是超级管理员，不能删除与修改
  const cardAction = (item) =>
    item.id === 1
      ? [<a onClick={() => handleAuthorize(item)}>授权</a>]
      : [
          <a onClick={() => handleUpdate(item)}> 修改 </a>,
          <a onClick={() => handleRemove(item)}> 删除 </a>,
          <a onClick={() => handleAuthorize(item)}>授权</a>,
        ];

  return (
    <PageHeaderWrapper content={headerContent}>
      <div className={styles.cardList}>
        <List
          rowKey="id"
          loading={loading}
          grid={{ gutter: 24, column: 4 }}
          dataSource={[{}, ...list]}
          renderItem={(item) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={cardAction(item)}>
                    <Card.Meta
                      avatar={<TrademarkOutlined style={{ fontSize: '50px' }} />}
                      title={
                        <a>
                          <div>{item.name}</div>
                          <div>{item.code}</div>
                        </a>
                      }
                      description={
                        <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                          {item.remark}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }

            return (
              <List.Item>
                <Button type="dashed" className={styles.newButton} onClick={handleRaise}>
                  <PlusOutlined /> 新增角色
                </Button>
              </List.Item>
            );
          }}
        />
      </div>

      {modalVisible ? <ModalForm /> : null}
      {authorizeVisible ? <DrawerAuthorize /> : null}
    </PageHeaderWrapper>
  );
};

export default connect(({ SysRoleModel, loading }) => ({
  SysRoleModel,
  loading: loading.models.SysRoleModel,
}))(SysRole);
