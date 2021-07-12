import React from 'react';
import { connect } from 'umi';
import { Modal, Form, Input, InputNumber, Radio, } from 'antd';
import {SelectDict} from '@/components/sys/Dict'

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalForm = (props) => {
  const {
    SysSystemModel: { modalVisible, system },
    dispatch,
  } = props;

  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch({ type: 'SysSystemModel/modalVisibleReducer', payload: false });
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const formValue = { ...system, ...fieldsValue };

    if (formValue.id) await dispatch({ type: 'SysSystemModel/updateEffect', payload: formValue });
    else await dispatch({ type: 'SysSystemModel/saveEffect', payload: formValue });

    dispatch({ type: 'SysSystemModel/listEffect'});
    onCancel();
  }

  return (
    <Modal
      destroyOnClose
      title={system.id ? '修改系统资源信息' : '新建系统资源信息'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form initialValues={system} form={form}>
        <FormItem
          {...formItemLayout}
          label="系统名称"
          name="name"
          rules={[{ required: true, message: '请输入系统名称!' }]}
        >
          <Input maxLength={10} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="系统类型"
          name="type"
          rules={[{ required: true, message: '请选择系统类型！' }]}
        >
          <SelectDict parentValue="sys_system_type"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="系统图标"
          name="icon"
          rules={[{ required: true, message: '请输入系统图标路径!' }]}
        >
          <Input maxLength={100} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="系统排序"
          name="sort"
          rules={[{ required: true, message: '请输入系统排序!' }]}
        >
          <InputNumber min={1} max={1000} defaultValue={1} style={{ width: '100%' }} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="引导页面"
          name="isGuide"
          rules={[{ required: true, message: '请选择是否在引导页面展示!' }]}
        >
          <Radio.Group>
            <Radio value='YES'> 是 </Radio>
            <Radio value='NO'> 否 </Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="进入方式"
          name="showType"
          rules={[{ required: true, message: '请选择系统进入方式!' }]}
        >
          <Radio.Group>
            <Radio value='SELF'> SELF </Radio>
            <Radio value='BLANK'> BLANK </Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="弹出路径"
          name="blankPath"
        >
          <Input maxLength={100} />
        </FormItem>
        <FormItem {...formItemLayout} label="系统简介" name="describe">
          <TextArea rows={4} maxLength={200} />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default connect(({ SysSystemModel }) => ({
  SysSystemModel,
}))(ModalForm);
