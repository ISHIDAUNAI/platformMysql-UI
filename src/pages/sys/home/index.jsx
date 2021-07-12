import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import SysHomeUserRow from './components/userRow';
import SysHomeLogRow from './components/logRow';
import SysHomeRoleCard from './components/roleCard';
import SysHomeDeptCard from './components/deptCard'
import { Space, Row, Col, } from 'antd';

const SysHome = (props) => {
  return (
    <GridContent>
      <Space direction="vertical" size="large" style={{width: '100%'}}>
        <SysHomeUserRow />

        <SysHomeLogRow />

        <Row gutter={24}>
          <Col span={12}> <SysHomeDeptCard /> </Col>
          <Col span={12}> <SysHomeRoleCard /> </Col>
        </Row>
      </Space>
    </GridContent>
  )
}

export default SysHome;
