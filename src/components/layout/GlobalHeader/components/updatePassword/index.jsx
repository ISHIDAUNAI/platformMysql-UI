import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { checkPassword, modifyPassword } from '@/services/sys/user';
import {removeToken} from "@/utils/token";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalUpdatePassword = (props) => {
  const {updatePasswordVisible, onCancel} = props
  const userPasswordParam = {oldPassword: '', newPassword: '', checkPassword: ''}

  const [form] = Form.useForm();

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const res = await modifyPassword(fieldsValue);

    if (res.result) {
      message.success("修改密码成功，请重新登录！");
      onCancel();

      removeToken();
      window.location.href = '/user/login';
    } else {
      message.error(res.message);
    }
  }

  const validatorOldPassword = (rule, value, callback) => {
    if (value) {
      checkPassword(value).then(res =>{
        if (res.result) {
          callback();
        } else {
          callback("原始密码不正确，请重新输入!");
        }
      });
    } else {
      callback();
    }
  }

  const validatorPassword = (rule, value, callback) => {
    if (value && form.getFieldValue('newPassword') !== form.getFieldValue('checkPassword')) {
      callback("修改密码与确认密码不一致");
    } else {
      callback();
    }
  }

  return (
    <Modal
      centered
      destroyOnClose
      title='修改登陆密码'
      visible={updatePasswordVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form initialValues={userPasswordParam} form={form}>
        <FormItem
          {...formItemLayout}
          label="原始密码"
          name="oldPassword"
          rules={[{ required: true, message: '请输入至少6位的原始密码!', min: 6 }, { validator: validatorOldPassword }]}
        >
          <Input.Password visibilityToggle={false} maxLength={200}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="修改密码"
          name="newPassword"
          rules={[{ required: true, message: '请输入至少6位的登陆密码!', min: 6 }]}
        >
          <Input.Password visibilityToggle={false} maxLength={200}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          name="checkPassword"
          dependencies={['newPassword']}
          rules={[{ required: true, message: '请输入至少6位的登陆密码!', min: 6 }, { validator: validatorPassword }]}
        >
          <Input.Password visibilityToggle={false} maxLength={200}/>
        </FormItem>
      </Form>
    </Modal>
  );
}

export default ModalUpdatePassword;
