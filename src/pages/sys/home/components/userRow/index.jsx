import { Col, Row } from 'antd';
import React, { useEffect } from "react";
import SysHomeUserRowUserCard from './userCard'
import SysHomeUserRowLoginNum from './loginNum'
import SysHomeUserRowLoginRatio from './loginRatio'
import SysHomeUserRowTimeCard from './timeCard'
import { connect } from 'umi';

const SysHomeUserRow = (props) => {
  const { dispatch } = props;

  useEffect(() => {  dispatch({ type: 'SysHomeModel/loginEffect'}); }, []);

  return (
    <Row gutter={24} >
      <Col span={6}> <SysHomeUserRowUserCard /> </Col>
      <Col span={6}> <SysHomeUserRowLoginNum /> </Col>
      <Col span={6}> <SysHomeUserRowLoginRatio /> </Col>
      <Col span={6}> <SysHomeUserRowTimeCard /> </Col>
    </Row>
  );
}

export default connect(({ loading }) => ({
  loading: loading.models.SysHomeModel,
}))( SysHomeUserRow )
