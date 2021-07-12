import React from 'react';
import { connect } from 'umi';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalPasswordForm = (props) => {
  const [form] = Form.useForm();

  const {
    SysUserModel: { modalPasswordVisible, passwordForm },
    dispatch,
  } = props;

  const onCancel = () => {
    dispatch({ type: 'SysUserModel/changePasswordVisibleReducer', payload: false });
  };

  const okHandle = async () => {
    await form.validateFields();
    await dispatch({ type: 'SysUserModel/updatePasswordEffect', payload: {id: passwordForm.id, password: form.getFieldValue('newPassword')} });

    onCancel();
  };

  const validatorPassword = (rule, value, callback) => {
    if (value && form.getFieldValue('oldPassword') !== form.getFieldValue('newPassword')) {
      callback("修改密码与确认密码不一致");
    } else {
      callback();
    }
  }

  return (
    <Modal
      destroyOnClose
      title={`修改 ${passwordForm.realName} 登陆密码`}
      visible={modalPasswordVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form initialValues={passwordForm} form={form}>
        <FormItem
          {...formItemLayout}
          label="修改密码"
          name="oldPassword"
          rules={[{ required: true, message: '请输入至少6位的登陆密码!', min: 6 }]}
        >
          <Input.Password visibilityToggle={false} maxLength={200}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          name="newPassword"
          dependencies={['oldPassword']}
          rules={[{ required: true, message: '请输入至少6位的登陆密码!', min: 6 }, { validator: validatorPassword }]}
        >
          <Input.Password visibilityToggle={false} maxLength={200}/>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default connect(({ SysUserModel }) => ({
  SysUserModel,
}))(ModalPasswordForm);
