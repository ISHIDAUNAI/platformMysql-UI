import { InfoCircleOutlined, CloseOutlined, CheckOutlined, TrademarkOutlined, } from '@ant-design/icons';
import { Tooltip, Row, Col, } from 'antd';
import {ChartCard, Field, MiniProgress} from '@/components/common/Charts';
import React from "react";
import numeral from 'numeral';
import { connect } from 'umi';

const SysHomeUserRowLoginRatio = (props) => {
  const {
    SysHomeModel : {login},
    loading,
  } = props;

  return (
    <ChartCard
      bordered={false}
      loading={loading}
      title="有效登录比例"
      action={ <Tooltip title="登录成功的次数 除以 用户登录的总次数" > <InfoCircleOutlined /> </Tooltip> }
      total={() => {
        return (
          <>
            <TrademarkOutlined />
            <span> {login.ratio}%</span>
          </>
        );
      }}
      footer={
        <Row gutter={24} >
          <Col span={12}>
            <Field
              label="登录成功次数"
              value={(
                <>
                  {numeral(login.success).format('0,0')}
                  <CheckOutlined style={{color: '#52c41a', marginLeft: '8px'}}/>
                </>
              )}
            />
          </Col>
          <Col span={12}>
            <Field
              label="登录失败次数"
              value={(
                <>
                  {numeral(login.error).format('0,0')}
                  <CloseOutlined style={{color: '#f5222d', marginLeft: '8px'}}/>
                </>
              )}
            />
          </Col>
        </Row>
      }
      contentHeight={46}
    >
      <MiniProgress percent={login.ratio} strokeWidth={8} target={80} color="#13C2C2" />
    </ChartCard>
  );
}

export default connect(({ SysHomeModel, loading }) => ({
  SysHomeModel,
  loading: loading.models.SysHomeModel,
}))( SysHomeUserRowLoginRatio )
