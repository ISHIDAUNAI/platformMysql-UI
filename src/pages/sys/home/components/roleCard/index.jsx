import React, { useEffect } from "react";
import { Card, } from 'antd';
import {Pie} from '@/components/common/Charts';
import { connect } from 'umi';

const SysHomeRoleCard = (props) => {
  const {
    SysHomeModel : {role},
    loading,
    dispatch
  } = props;

  useEffect(() => {  dispatch({ type: 'SysHomeModel/roleEffect'}); }, []);

  return (
    <Card
      loading={loading}
      title="用户角色占比分析"
      bodyStyle={{
        height: '350px'
      }}
    >
      <Pie
        hasLegend
        data={role}
        height={280}
        lineWidth={4}
        subTitle="角色个数"
        total={role.length}
      />
    </Card>
  );
}

export default connect(({ SysHomeModel, loading }) => ({
  SysHomeModel,
  loading: loading.models.SysHomeModel,
}))( SysHomeRoleCard )
