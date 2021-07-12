import React from 'react';
import { connect } from 'umi';
import { Modal, Form, Input, Radio, } from 'antd';
import {TreeSelectResource} from '@/components/sys/Resource'

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalForm = (props) => {
  const {
    SysButtonModel: { modalVisible, button },
    refresh,
    dispatch,
  } = props;

  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch({ type: 'SysButtonModel/modalVisibleReducer', payload: false });
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const formValue = { ...button, ...fieldsValue };

    if (formValue.id) await dispatch({ type: 'SysButtonModel/updateEffect', payload: formValue });
    else await dispatch({ type: 'SysButtonModel/saveEffect', payload: formValue });

    refresh()

    onCancel();
  }

  return (
    <Modal
      destroyOnClose
      title={button.id ? '修改按钮资源信息' : '新建按钮资源信息'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form initialValues={button} form={form}>
        <FormItem
          {...formItemLayout}
          label="上级资源"
          name="parentId"
          rules={[{ required: true, message: '请选择上级资源!' }]}
        >
          <TreeSelectResource type='MENU'/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="按钮名称"
          name="name"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
        >
          <Input maxLength={10} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="权限标志"
          name="permission"
        >
          <Input maxLength={100} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请求链接"
          name="url"
          rules={[{ required: true, message: '请输入请求链接!' }]}
        >
          <Input maxLength={100} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请求方式"
          name="method"
          rules={[{ required: true, message: '请输入请求链接!' }]}
        >
          <Radio.Group>
            <Radio value='GET'> GET </Radio>
            <Radio value='POST'> POST </Radio>
            <Radio value='PUT'> PUT </Radio>
            <Radio value='DELETE'> DELETE </Radio>
          </Radio.Group>
        </FormItem>
        <FormItem {...formItemLayout} label="按钮备注" name="remark">
          <TextArea rows={4} maxLength={200} />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default connect(({ SysButtonModel }) => ({
  SysButtonModel,
}))(ModalForm);
