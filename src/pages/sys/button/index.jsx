import React, {useEffect, useState}  from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Button,  Row, Col, Card, Table, Divider, Descriptions,} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import ModalForm from './components/form';
import Confirm from '@/components/common/Confirm';
import SelectMenu from './components/selectMenu';
import styles from './index.less';

const SysButton = (props) => {
  const {
    SysButtonModel: { modalVisible, list, },
    loading,
    dispatch,
  } = props;

  const [resource, handleResource] = useState({});

  const handleRaise = () => {
    dispatch({ type: 'SysButtonModel/modalVisibleReducer', payload: true });
    dispatch({ type: 'SysButtonModel/buttonReducer', payload: null });
  }

  const handleUpdate = (record) => {
    dispatch({ type: 'SysButtonModel/modalVisibleReducer', payload: true });
    dispatch({ type: 'SysButtonModel/buttonReducer', payload: record });
  }

  const refresh = () => {
    dispatch({ type: 'SysButtonModel/listEffect', payload: resource.id });
  }

  const handleDelete = (record) => {
    Confirm.delete({
      content: `<p>名称为 <span style="color: #f60"> ${record.name} </span> 的按钮资源将被删除</p><p>是否继续？</p>`,
      confirm: async () => {
        await dispatch({ type: 'SysButtonModel/removeEffect', payload: record.id });
        refresh()
      },
    });
  }

  const selectResource = (item) => {
    handleResource(item);
    dispatch({ type: 'SysButtonModel/listEffect', payload: item.id });
  }

  const columns = [
    { dataIndex: 'name', title: '按钮名称', },
    { dataIndex: 'permission', title: '权限标识', },
    { dataIndex: 'url', title: '请求链接', },
    { dataIndex: 'method', title: '请求方式', },
    { dataIndex: 'remark', title: '备注', },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => { handleUpdate(record) }} > <EditOutlined/> 修改 </a>

          <Divider type="vertical" />
          <a onClick={() => { handleDelete(record); }} > <DeleteOutlined /> 删除 </a>
        </>
      ),
    },
  ];

  const wrapperContent = (
    <Descriptions title="使用说明" column={1}>
      <Descriptions.Item label="请求链接 + 请求方式">这两项字段构成了后端OAuth2访问权限的内容，要访问后端接口，首先要给角色授权。</Descriptions.Item>
      <Descriptions.Item label="权限标识">该字段是标志字段，在用户登录后，可以在localStorage中获取所有授权的该字段值，可灵活运用，比如控制是否展示按钮。</Descriptions.Item>
    </Descriptions>
  );

  return (
    <PageHeaderWrapper content={wrapperContent}>
      <Row gutter={32}>
        <Col span={4}>
          <Card >
            <SelectMenu onSelect={selectResource}/>
          </Card>
        </Col>
        <Col span={20}>
          <Card title={`${resource.name ? resource.name : ''  } 菜单项配置`} className={styles.tableCard}
                extra={<Button type="primary" onClick={() => handleRaise()} icon={<PlusOutlined />} >新增</Button>} >
            <Table columns={columns} dataSource={list} loading={loading} rowKey='id' pagination={false} />
          </Card>
        </Col>
      </Row>

      {modalVisible ? <ModalForm refresh={() => refresh()}/> : null}
    </PageHeaderWrapper>
  )
}

export default connect(({ SysButtonModel, loading }) => ({
  SysButtonModel,
  loading: loading.models.SysButtonModel,
}))(SysButton);
