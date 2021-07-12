import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Tag, DatePicker, } from 'antd';
import {page} from "@/services/log/login";
import moment from 'moment';

const LogLogin = () => {
  const actionRef = useRef();

  const columns = [
    { title: '登录名称', dataIndex: 'userName', order: 2 },
    { title: '登录人员', dataIndex: 'realName', order: 1 },
    {
      title: '登录时间', dataIndex: 'createDate', valueType: 'dateTime', order: 3,
      initialValue: moment(new Date()),
      renderFormItem: (item, { type, defaultRender, ...rest }) => {
        return <DatePicker {...rest} picker="month" style={{width: '100%'}} allowClear={false} inputReadOnly/>;
      }
    },
    {
      title: '登录结果',
      dataIndex: 'result',
      hideInSearch: true,
      renderText: (_, record) => {
        if (record.result === 'SUCCESS') {
          return (<Tag color="success">成功</Tag>)
        }

        return (<Tag color="processing">失败</Tag>)
      }
    },
    { title: '结果编码', dataIndex: 'code', hideInSearch: true },
    { title: '结果信息', dataIndex: 'message', hideInSearch: true },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="登录日志查询列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => []}
        request={(params) => {
          const year = params.createDate ? moment(params.createDate).format("YYYY") : moment(new Date()).format("YYYY")
          const month = params.createDate ? moment(params.createDate).format("MM") : moment(new Date()).format("MM")

          const p = { ...params, ...{year: Number(year)}, ...{month: Number(month)}, }
          return page(p);
        }}
        columns={columns}
      />
    </PageHeaderWrapper>
  )
}

export default LogLogin;
