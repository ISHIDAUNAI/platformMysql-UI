import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PauseOutlined,
  FastForwardOutlined,
  StepBackwardOutlined
} from '@ant-design/icons';
import Confirm from '@/components/common/Confirm';
import ModalForm from './components/form';
import { page, startNow, resume, pause, remove } from '@/services/sys/task';

const SysTask = () => {
  const [modalVisible, handleModalVisible] = useState(false);
  const [formValues, handleFormValues] = useState({});
  const actionRef = useRef();

  /**
   * 删除定时任务
   * @param record 任务信息
   */
  const handleDelete = (record) => {
    Confirm.delete({
      content: `<p>名称为 <span style="color: #f60"> ${record.name} </span> 的定时任务将被删除</p><p>是否继续？</p>`,
      confirm: () => {
        remove(record).then((data) => {
          if (data.result) {
            if (actionRef.current) actionRef.current.reload();
            message.success('删除成功!');
          } else {
            message.error('删除失败!');
          }
        });
      },
    });
  };

  /**
   * 立即执行任务
   * @param record 任务信息
   */
  const handleStart = (record) => {
    Confirm.sure({
      content: `立即执行任务： <span style="color: #f60"> ${record.name} </span> `,
      confirm: () => {
        startNow(record).then((data) => {
          if (data.result) {
            message.success('任务已执行!');
          } else {
            message.error('执行失败!');
          }
        });
      },
    });
  };

  /**
   * 停用任务
   * @param record 任务信息
   */
  const handlePause = (record) => {
    Confirm.sure({
      content: `停用任务： <span style="color: #f60"> ${record.name} </span> `,
      confirm: () => {
        pause(record).then((data) => {
          if (data.result) {
            message.success('停用任务成功!');

            if (actionRef.current) actionRef.current.reload();
          } else {
            message.error('停用任务失败!');
          }
        });
      },
    });
  };

  /**
   * 启用任务
   * @param record 任务信息
   */
  const handleResume = (record) => {
    Confirm.sure({
      content: `启用任务： <span style="color: #f60"> ${record.name} </span> `,
      confirm: () => {
        resume(record).then((data) => {
          if (data.result) {
            message.success('启用任务成功!');

            if (actionRef.current) actionRef.current.reload();
          } else {
            message.error('启用任务失败!');
          }
        });
      },
    });
  };

  const columns = [
    { title: '任务名称', dataIndex: 'name' },
    { title: '任务分组', dataIndex: 'groupName', hideInSearch: true },
    { title: '定时规则', dataIndex: 'rule', hideInSearch: true },
    { title: '任务类名', dataIndex: 'className', hideInSearch: true },
    {
      title: '启用状态',
      dataIndex: 'usedState',
      valueEnum: {
        YES: { text: '启用', status: 'Success' },
        NO: { text: '停用', status: 'Default' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleFormValues(record);
              handleModalVisible(true);
            }}
          > <EditOutlined/> 修改 </a>

          <Divider type="vertical" />
          <a onClick={() => { handleDelete(record); }} > <DeleteOutlined /> 删除 </a>

          <Divider type="vertical" />
          <a onClick={() => { handleStart(record); }} > <FastForwardOutlined /> 立即执行 </a>

          {record.usedState === 'YES' ? (
            <>
              <Divider type="vertical" />
              <a onClick={() => { handlePause(record); }} > <PauseOutlined /> 停用 </a>
            </>
          ) : (
            <>
              <Divider type="vertical" />
              <a onClick={() => { handleResume(record); }} > <StepBackwardOutlined /> 启用 </a>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper content="定时任务配置管理">
      <ProTable
        headerTitle="定时任务查询列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              handleFormValues({});
              handleModalVisible(true);
            }}
          >
            新建
          </Button>,
        ]}
        request={(params) => page(params)}
        columns={columns}
      />

      {/* 注意： modalVisible变化时要重新渲染，否则Form中的值，不变化 */}
      {modalVisible ? (
        <ModalForm
          onSubmit={() => {
            handleModalVisible(false);

            if (actionRef.current) actionRef.current.reload();
          }}
          onCancel={() => {
            handleModalVisible(false);
          }}
          modalVisible={modalVisible}
          values={formValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default SysTask;
