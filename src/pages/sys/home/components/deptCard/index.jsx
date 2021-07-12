import React, { useEffect } from "react";
import { Card, Table, } from 'antd';
import { connect } from 'umi';

const SysHomeDeptCard = (props) => {
  const {
    SysHomeModel : {dept},
    dispatch,
    loading,
  } = props;

  useEffect(() => {  dispatch({ type: 'SysHomeModel/deptEffect'}); }, []);

  const columns = [
    /*
    {
      title: '排名', dataIndex: 'deptName', key: 'deptName',
      render: (text, record, index) => (
        <span> {index + 1} </span>
      ),
    },
    */
    { title: '排名', dataIndex: 'deptIndex', key: 'deptIndex', },
    { title: '部门名称', dataIndex: 'deptName', key: 'deptName', },
    { title: '用户数量', dataIndex: 'userNum', key: 'userNum', },
    { title: '登录次数', dataIndex: 'loginNum', key: 'loginNum', },
  ];

  return (
    <Card
      loading={loading}
      title="部门用户数量分析"
      bodyStyle={{
        height: '350px',
        paddingTop: '40px'
      }}
    >
      <Table
        rowKey='id'
        size="small"
        columns={columns}
        dataSource={dept}
        pagination={{
          style: { marginBottom: 0, },
          pageSize: 5,
        }}
      />
    </Card>
  );
}

export default connect(({ SysHomeModel, loading }) => ({
  SysHomeModel,
  loading: loading.models.SysHomeModel,
}))( SysHomeDeptCard )
