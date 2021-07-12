import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Card, Col, Row, Tree, Button, Descriptions } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Confirm from '@/components/common/Confirm';
import ModalForm from './components/form';

const SysDept = (props) => {
  const {
    SysDeptModel: { treeData, selectDept, modalVisible, deptType },
    dispatch,
  } = props;

  // init
  useEffect(() => {
    dispatch({ type: 'SysDeptModel/listEffect' });
  }, []);

  /**
   * 选择部门
   */
  const HandleSelectDept = (selectedKeys, { selected, node }) => {
    if (selected) {
      dispatch({ type: 'SysDeptModel/selectDeptReducer', payload: node });
    }
  };

  /**
   * 删除部门信息
   */
  const handleRemove = () => {
    Confirm.delete({
      content: `<p>名称为 <span style="color: #f60"> ${selectDept.name} </span> 的部门将被删除</p><p>是否继续？</p>`,
      confirm: async () => {
        await dispatch({ type: 'SysDeptModel/removeEffect' });
        dispatch({ type: 'SysDeptModel/listEffect' });
      },
    });
  };

  /**
   * 新增部门
   */
  const handleRaise = () => {
    dispatch({ type: 'SysDeptModel/deptReducer', payload: null });
    dispatch({ type: 'SysDeptModel/changeVisibleReducer', payload: true });
  };

  /**
   * 修改部门
   */
  const handleUpdate = () => {
    dispatch({ type: 'SysDeptModel/deptReducer', payload: selectDept });
    dispatch({ type: 'SysDeptModel/changeVisibleReducer', payload: true });
  };

  /**
   * 部门信息 element
   */
  const ElementDeptInfo = () => (
    <>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={6} offset="12">
          <Button type="dashed" block onClick={() => handleUpdate()}>
            <EditOutlined /> 修改
          </Button>
        </Col>
        <Col span={6}>
          <Button type="dashed" block onClick={() => handleRemove()}>
            <DeleteOutlined /> 删除
          </Button>
        </Col>
      </Row>

      <Descriptions title={selectDept.name} column={2}>
        <Descriptions.Item label="部门简称">{selectDept.nameSimple}</Descriptions.Item>
        <Descriptions.Item label="机构编码">{selectDept.code}</Descriptions.Item>

        <Descriptions.Item label="拼音编码">{selectDept.namePy}</Descriptions.Item>
        <Descriptions.Item label="五笔编码">{selectDept.nameWb}</Descriptions.Item>

        <Descriptions.Item label="机构类型">{deptType[selectDept.type]}</Descriptions.Item>
        <Descriptions.Item label="机构级别">{selectDept.grade}</Descriptions.Item>

        <Descriptions.Item label="负责人员">{selectDept.relationName}</Descriptions.Item>
        <Descriptions.Item label="联系手机">{selectDept.relationMobile}</Descriptions.Item>

        <Descriptions.Item label="主要号码">{selectDept.relationPhone1}</Descriptions.Item>
        <Descriptions.Item label="备份号码">{selectDept.relationPhone2}</Descriptions.Item>

        <Descriptions.Item label="机构排序">{selectDept.sort}</Descriptions.Item>
        <Descriptions.Item label="详细地址">{selectDept.relationAddress}</Descriptions.Item>

        <Descriptions.Item label="部门说明">{selectDept.remark}</Descriptions.Item>
      </Descriptions>
    </>
  );

  return (
    <PageHeaderWrapper content="机构部门管理，提供对机构部门信息增删改查的基本功能">
      <Row>
        <Col span={20} offset="2">
          <Card bordered={false}>
            <Row>
              <Col span={8}>
                <Button type="dashed" block style={{ marginBottom: 24 }} onClick={handleRaise}>
                  <PlusOutlined /> 添加
                </Button>
                {
                  treeData && treeData.length > 0 ?
                    <Tree
                      defaultExpandedKeys={['21', '2101']}
                      treeData={treeData}
                      selectedKeys={[selectDept ? selectDept.id : null]}
                      onSelect={HandleSelectDept}
                    />
                    :
                    null
                }

              </Col>
              <Col span={14} offset="2">
                {selectDept ? <ElementDeptInfo /> : null}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {modalVisible ? <ModalForm /> : null}
    </PageHeaderWrapper>
  );
};

export default connect(({ SysDeptModel, loading }) => ({
  SysDeptModel,
  loading: loading.models.SysDeptModel,
}))(SysDept);
