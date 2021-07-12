import { InfoCircleOutlined, UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import {ChartCard, Field} from '@/components/common/Charts';
import React, { useEffect } from "react";
import numeral from 'numeral';
import { connect } from 'umi';

const SysHomeUserRowUserCard = (props) => {
  const {
    SysHomeModel : {user},
    loading,
    dispatch
  } = props

  useEffect(() => {  dispatch({ type: 'SysHomeModel/userEffect'}); }, []);

  return (
    <ChartCard
      bordered={false}
      title='用户数量'
      action={ <Tooltip title="平台中拥有登录权限的系统用户数量" > <InfoCircleOutlined /> </Tooltip> }
      loading={loading}
      total={() => {
        return (
          <>
            <UserOutlined />
            <span> {numeral(user.total).format('0,0')}</span>
          </>
        );
      }}
      footer={ <Field label="今日新增" value={numeral(user.today).format('0,0')} /> }
      contentHeight={46}
    >
      <Row gutter={24} >
        <Col span={12}>
          <Field
            label="启用人数"
            value={(
              <>
                {numeral(user.yesState).format('0,0')}
                <CheckOutlined style={{color: '#52c41a', marginLeft: '8px'}}/>
              </>
            )}
          />
        </Col>
        <Col span={12}>
          <Field
            label="禁用人数"
            value={(
              <>
                {numeral(user.noState).format('0,0')}
                <CloseOutlined style={{color: '#f5222d', marginLeft: '8px'}}/>
              </>
            )}
          />
        </Col>
      </Row>
    </ChartCard>
  );
}

export default connect(({ SysHomeModel, loading }) => ({
  SysHomeModel,
  loading: loading.models.SysHomeModel,
}))( SysHomeUserRowUserCard )
