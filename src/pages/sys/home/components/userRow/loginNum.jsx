import { InfoCircleOutlined, LoginOutlined, } from '@ant-design/icons';
import { Tooltip } from 'antd';
import {ChartCard, Field, MiniArea, MiniBar} from '@/components/common/Charts';
import React from "react";
import numeral from 'numeral';
import { connect } from 'umi';

const SysHomeUserRowLoginNum = (props) => {
  const {
    SysHomeModel : {login},
    loading,
  } = props;

  return (
    <ChartCard
      bordered={false}
      loading={loading}
      title="登录次数"
      action={ <Tooltip title="用户登录的总次数" > <InfoCircleOutlined /> </Tooltip> }
      total={() => {
        return (
          <>
            <LoginOutlined />
            <span> {numeral(login.total).format('0,0')}</span>
          </>
        );
      }}
      footer={ <Field label="今日登录" value={numeral(login.today).format('0,0') + ' 次'} /> }
      contentHeight={46}
    >
      {/* <MiniBar color="#975FE4" data={visitData} /> */}
      <MiniArea color="#975FE4" data={login.list} />
    </ChartCard>
  );
}

export default connect(({ SysHomeModel, loading }) => ({
  SysHomeModel,
  loading: loading.models.SysHomeModel,
}))( SysHomeUserRowLoginNum )
