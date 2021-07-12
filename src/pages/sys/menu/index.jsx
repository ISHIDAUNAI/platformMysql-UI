import React, { useState, } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Button,  Row, Col, Card, Table, Divider, Tag, Descriptions} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styles from './index.less';

import ModalForm from './components/form';
import Confirm from '@/components/common/Confirm';
import SelectSystem from './components/selectSystem';

const SysMenu = (props) => {
  const {
    SysMenuModel: { modalVisible, list, },
    loading,
    dispatch,
  } = props;

  const [system, handleSystem] = useState({systemName: '', systemResourceId: ''});

  const handleRaise = () => {
    dispatch({ type: 'SysMenuModel/modalVisibleReducer', payload: true });
    dispatch({ type: 'SysMenuModel/menuReducer', payload: null });
  }

  const handleUpdate = (record) => {
    dispatch({ type: 'SysMenuModel/modalVisibleReducer', payload: true });
    dispatch({ type: 'SysMenuModel/menuReducer', payload: record });
  }

  const handleDelete = (record) => {
    Confirm.delete({
      content: `<p>名称为 <span style="color: #f60"> ${record.name} </span> 的菜单资源将被删除</p><p>是否继续？</p>`,
      confirm: async () => {
        await dispatch({ type: 'SysMenuModel/removeEffect', payload: record.menuId });
        refresh()
      },
    });
  }

  const changeSystem = (s) => {
    handleSystem(s);
    dispatch({ type: 'SysMenuModel/listEffect', payload: s.systemResourceId });
  }

  const refresh = () => {
    dispatch({ type: 'SysMenuModel/listEffect', payload: system.systemResourceId });
  }

  const columns = [
    {
      dataIndex: 'icon', title: '菜单图标',
      render: (_, record) => {
        if (record.icon) {
          return (
            <>
              <img src={record.icon} alt="icon"
                   style={{height: '20px', width: '20px', backgroundColor: '#91d5ff', marginRight: '20px'}} />
              <span>{record.icon}</span>
            </>
          )
        }

        return null;
      }
    },
    { dataIndex: 'name', title: '菜单名称', },
    { dataIndex: 'path', title: '访问路径', },
    { dataIndex: 'component', title: '组件路径', },
    {
      dataIndex: 'isIndex', title: '是否主页',
      render: (_, record) => {
        if (record.isIndex === 'YES') {
          return (<Tag color="success">是</Tag>)
        }

        return (<Tag color="processing">否</Tag>)
      }
    },
    {
      dataIndex: 'showType', title: '展示方式',
      render: (_, record) => {
        if (record.showType === 'HOME') {
          return (<Tag color="success">HOME</Tag>)
        }

        return (<Tag color="processing">SCREEN</Tag>)
      }
    },
    { dataIndex: 'sort', title: '菜单排序', },
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
      <Descriptions.Item label="组件路径的配置">一个在pages文件夹下的‘文件夹’路径，该文件夹中必须有index.jsx文件。具体请查看app.jsx中的运行时配置逻辑</Descriptions.Item>
      <Descriptions.Item label="是否主页的配置">在配置系统与菜单之间的关系时一定要注意，授予角色的权限中，一个系统必须有且只有一个主页菜单。主页菜单的父页面也要配置成主页。</Descriptions.Item>
      <Descriptions.Item label="展示方式的配置">HOME代表在页面框架内（即上面title，左侧菜单，右侧内容的BasicLayout.jsx子页面），SCREEN代表全屏页（即脱离页面框架）。</Descriptions.Item>
      <Descriptions.Item label="图标的配置">菜单图标要预先放置在public文件夹下。</Descriptions.Item>
      <Descriptions.Item label="排序问题">目前存在排序的问题，一级菜单与二级菜单的排序方式不一致。</Descriptions.Item>
      <Descriptions.Item label="其他问题">当系统进入方式为BLANK时，以系统‘弹出路径’字段值为主，不以菜单中主页配置为主。</Descriptions.Item>
    </Descriptions>
  );

  return (
    <PageHeaderWrapper content={wrapperContent}>
      <Row gutter={32}>
        <Col span={4}>
          <SelectSystem onChange={changeSystem}/>
        </Col>
        <Col span={20}>
          <Card className={styles.tableCard}
            title={`${system.systemName  } 菜单项配置`}
            extra={<Button type="primary" onClick={() => handleRaise()} icon={<PlusOutlined />} >新增</Button>}
          >
            <Table
              columns={columns} dataSource={list}
              loading={loading} rowKey='menuId' pagination={false}
            />
          </Card>
        </Col>
      </Row>

      {modalVisible ? <ModalForm refresh={() => refresh()}/> : null}
    </PageHeaderWrapper>
  )
}

export default connect(({ SysMenuModel, loading }) => ({
  SysMenuModel,
  loading: loading.models.SysMenuModel,
}))(SysMenu);
