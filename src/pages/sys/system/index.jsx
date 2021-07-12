import React, { useEffect }  from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Button, Alert, Space, Row, Col, Card, Descriptions, Typography, Spin, } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Confirm from '@/components/common/Confirm';
import styles from './index.less';

import ModalForm from './components/form';

const SysSystem = (props) => {
  const {
    SysSystemModel: { modalVisible, list, },
    loading,
    dispatch,
  } = props;

  useEffect(() => {  dispatch({ type: 'SysSystemModel/listEffect'}); }, []);

  const handleRaise = () => {
    dispatch({ type: 'SysSystemModel/systemReducer', payload: null });
    dispatch({ type: 'SysSystemModel/modalVisibleReducer', payload: true });
  }

  const handleUpdate = (systemInfo) => {
    dispatch({ type: 'SysSystemModel/systemReducer', payload: systemInfo });
    dispatch({ type: 'SysSystemModel/modalVisibleReducer', payload: true });
  }

  const handleDelete = (systemInfo) => {
    Confirm.delete({
      content: `<p>名称为 <span style="color: #f60"> ${systemInfo.name} </span> 的系统资源将被删除</p><p>是否继续？</p>`,
      confirm: async () => {
        await dispatch({ type: 'SysSystemModel/removeEffect', payload: systemInfo.id });
        dispatch({ type: 'SysSystemModel/listEffect'});
      },
    });
  }

  const extraContent = (
    <Button className={styles.extraContent} type="primary" icon={<PlusOutlined />} onClick={() => handleRaise()}>
      新增
    </Button>
  );

  const extraCardContent = (systemInfo) => (
    <Space >
      <Button size="small" icon={<EditOutlined />} onClick={() => handleUpdate(systemInfo)} />
      <Button size="small" icon={<DeleteOutlined />} onClick={() => handleDelete(systemInfo)}/>
    </Space>
  )

  const systemContent = (systemList) => {
    return systemList.map(data => {
      return (
        <Col span={6} key={data.id}>
          <Card title={data.name} extra={extraCardContent(data)} >
            <Row gutter={16} className={styles.systemBase}>
              <Col span={12}>
                <img src={data.icon} alt={data.name}/>
              </Col>
              <Col span={12}>
                <Descriptions column={1}>
                  <Descriptions.Item label="排序">{data.sort}</Descriptions.Item>
                  <Descriptions.Item label="展示引导页">{data.isGuide === 'YES' ? '是' : '否'}</Descriptions.Item>
                  <Descriptions.Item label="进入方式">{data.showType}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            {
              data.blankPath ? (
                <Typography.Paragraph ellipsis={{ rows: 1, expandable: false, }}>
                  <span>弹出路径：</span> {data.blankPath}
                </Typography.Paragraph>
              ) : (null)
            }

            <Typography.Paragraph ellipsis={{ rows: 3, expandable: false, }}>
              <span>系统简介：</span> {data.describe}
            </Typography.Paragraph>
          </Card>
        </Col>
      )
    })
  }

  const listContent = list.map(data => {
    return (
      <Space direction="vertical" size="large" style={{width: '100%'}} key={data.typeName}>
        <Alert message={data.typeName} type="info" />

        <Row gutter={32}>
          {systemContent(data.systemList)}
        </Row>
      </Space>
    )
  });

  const wrapperContent = (
    <Descriptions title="使用说明" column={1}>
      <Descriptions.Item label="是否展示引导页的配置">当角色有权限查看的系统中，有一个系统配置了需要展示引导页面，那么当该角色的用户登录后，会展示引导页面。</Descriptions.Item>
      <Descriptions.Item label="系统进入方式的说明">系统进入方式的值，对应html中a标签的target属性值的作用。</Descriptions.Item>
      <Descriptions.Item label="系统进入方式为BLANK的配置">该配置要填写‘弹出路径’字段的值，该值可以是外部系统的完整路径，也可以是本系统的相对路径，如果是本系统路径，要配置相应的菜单路由与权限分配。</Descriptions.Item>
      <Descriptions.Item label="图标的配置">系统图标要预先放置在public文件夹下。</Descriptions.Item>
    </Descriptions>
  )

  return (
    <PageHeaderWrapper content={wrapperContent} extraContent={extraContent} className={styles.wrapperContent}>
      <Spin spinning={loading}>
        {listContent}
      </Spin>

      {modalVisible ? <ModalForm /> : null}
    </PageHeaderWrapper>
  )
}

export default connect(({ SysSystemModel, loading }) => ({
  SysSystemModel,
  loading: loading.models.SysSystemModel,
}))(SysSystem);

