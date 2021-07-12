import React, {useRef, useState} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, message } from 'antd';
import {
  PlusOutlined,
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Confirm from '@/components/common/Confirm';
import ModalForm from './components/form';

import { tree, remove } from '@/services/sys/dict';

const SysDict = () => {
  const [modalVisible, handleModalVisible] = useState(false);
  const [formValues, handleFormValues] = useState({});
  const actionRef = useRef();

  /**
   * 删除字典信息
   * @param record 字典信息
   */
  const handleDelete = (record) => {
    Confirm.delete({
      content: `<p>名称为 <span style="color: #f60"> ${record.label} </span> 的字典信息将被删除</p><p>是否继续？</p>`,
      confirm: () => {
        remove(record.id).then((data) => {
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

  const columns = [
    { title: '字典标签', dataIndex: 'label', key: 'label' },
    { title: '字典键值', dataIndex: 'value', key: 'value' },
    { title: '排序值', dataIndex: 'sort', key: 'sort' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {
              handleFormValues(record);
              handleModalVisible(true);
            }}
          > <EditOutlined/> 修改 </a>

          <Divider type="vertical" />
          <a onClick={() => { handleDelete(record); }} > <DeleteOutlined /> 删除 </a>

          <Divider type="vertical" />
          <a onClick={() => {
              handleFormValues({parentId: record.id, parentLabel: record.label});
              handleModalVisible(true);
            }}
          > <PlusSquareOutlined /> 添加下级字典 </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="字典列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} type="primary"
                  onClick={() => {
                    handleFormValues({});
                    handleModalVisible(true);
                  }}
          >
            新建
          </Button>,
        ]}
        search={false}
        request={(params) => tree(params)}
        columns={columns}
      />

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

export default SysDict;
