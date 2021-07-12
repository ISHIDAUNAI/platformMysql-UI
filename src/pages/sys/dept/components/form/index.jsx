import React from 'react';
import { connect } from 'umi';
import { Modal, Form, Input, InputNumber, TreeSelect, Col, Row, Select, } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const ModalForm = (props) => {
  const {
    SysDeptModel: { modalVisible, treeSelectData, dept },
    dispatch,
  } = props;

  const [form] = Form.useForm();

  /**
   * 关闭modal
   */
  const onCancel = () => {
    dispatch({ type: 'SysDeptModel/changeVisibleReducer', payload: false });
  };

  /**
   * 确定事件
   */
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const formValue = { ...dept, ...fieldsValue };

    if (formValue.id) await dispatch({ type: 'SysDeptModel/updateEffect', payload: formValue });
    else await dispatch({ type: 'SysDeptModel/saveEffect', payload: formValue });

    dispatch({ type: 'SysDeptModel/listEffect' });
    onCancel();
  };

  /**
   * 校验部门编码是否可用
   */
  const validatorCode = (rule, value, callback) => {
    if (value) {
      dispatch({
        type: 'SysDeptModel/checkCodeEffect',
        payload: { id: dept.id, code: value}
      }).then((result) => {
        if (result) callback();
        else callback("部门编码已被使用");
      });
    } else {
      callback();
    }
  };

  return (
    <Modal
      destroyOnClose
      title={dept.id ? '修改部门信息' : '新建部门信息'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={onCancel}
      width={800}
    >
      <Form
        initialValues={{
          parentId: dept.parentId ,
          name: dept.name,
          nameSimple: dept.nameSimple,
          namePy: dept.namePy,
          nameWb: dept.nameWb,
          type: dept.type,
          grade: dept.grade,
          code: dept.code,
          sort: dept.sort,
          relationName: dept.relationName,
          relationPhone1: dept.relationPhone1,
          relationPhone2: dept.relationPhone2,
          relationMobile: dept.relationMobile,
          relationAddress: dept.relationAddress,
          remark: dept.remark,
        }}
        form={form}
      >
        <FormItem
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          label="上级部门"
          name="parentId"
        >
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={dept.parentId}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeSelectData}
            treeDefaultExpandAll
          />
        </FormItem>
        <Row >
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="部门名称"
              name="name"
              rules={[{ required: true, message: '请输入部门名称!' }]}
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="部门简称"
              name="nameSimple"
              rules={[{ required: true, message: '请输入部门名称!' }]}
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
        </Row>

        <Row >
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="拼音编码"
              name="namePy"
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="五笔编码"
              name="nameWb"
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
        </Row>
        <Row >
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="机构类型"
              name="type"
              rules={[{ required: true, message: '请输入机构类型!' }]}
            >
              <Select placeholder="请选择机构类型">
                <Select.Option value="J01">省级机构</Select.Option>
                <Select.Option value="J02">市级机构</Select.Option>
                <Select.Option value="J03">区级机构</Select.Option>
                <Select.Option value="J04">社区机构</Select.Option>
                <Select.Option value="Y11">省直医院</Select.Option>
                <Select.Option value="Y12">市直医院</Select.Option>
                <Select.Option value="Y13">民营委管</Select.Option>
                <Select.Option value="Y14">区直医院</Select.Option>
                <Select.Option value="Y15">社区医院</Select.Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="机构级别"
              name="grade"
              rules={[{ required: true, message: '请输入机构级别!' }]}
            >
              <InputNumber min={1} max={10} defaultValue={1} style={{ width: '100%' }} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="机构编码"
              name="code"
              rules={[{ required: true, message: '请输入部门编码!' }, { validator: validatorCode }]}
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="机构排序"
              name="sort"
              rules={[{ required: true, message: '请输入部门排序!' }]}
            >
              <InputNumber min={1} max={1000} defaultValue={1} style={{ width: '100%' }} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="负责人员"
              name="relationName"
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="联系手机"
              name="relationMobile"
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
        </Row>
        <Row >
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="主要号码"
              name="relationPhone1"
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="备份号码"
              name="relationPhone2"
            >
              <Input maxLength={20} />
            </FormItem>
          </Col>
        </Row>

        <FormItem
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          label="详细地址"
          name="relationAddress"
        >
          <Input maxLength={100} />
        </FormItem>

        <FormItem
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          label="部门说明"
          name="remark"
        >
          <TextArea rows={4} maxLength={200} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default connect(({ SysDeptModel }) => ({
  SysDeptModel,
}))(ModalForm);
