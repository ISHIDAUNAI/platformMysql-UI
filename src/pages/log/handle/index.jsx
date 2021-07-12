import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {page} from "@/services/log/handle";
import { DatePicker, } from 'antd';
import moment from 'moment';

const LogHandle = () => {
  const actionRef = useRef();

  const columns = [
    { title: '操作人员', dataIndex: 'userName', order: 2, },
    {
      title: '操作时间', dataIndex: 'createDate', valueType: 'dateTime',
      order: 3,
      initialValue: moment(new Date()),
      renderFormItem: (item, { type, defaultRender, ...rest }) => {
        return <DatePicker {...rest} picker="month" style={{width: '100%'}} allowClear={false} inputReadOnly/>;
      }
    },
    { title: '日志信息', dataIndex: 'detail', hideInSearch: true, },
    { title: '事件类型', dataIndex: 'eventTypeName', hideInSearch: true, },
    { title: '模块类型', dataIndex: 'moduleTypeName', hideInSearch: true, },
    { title: '访问方法', dataIndex: 'method', hideInSearch: true, },
    { title: '访问路径', dataIndex: 'url', hideInSearch: true, },
    { title: '访问方式', dataIndex: 'httpType', hideInSearch: true, },
    { title: '访问参数', dataIndex: 'args', hideInSearch: true, },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        scroll={{x: 'max-content'}}
        headerTitle="操作日志查询列表"
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

export default LogHandle;
