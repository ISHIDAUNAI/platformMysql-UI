import React from 'react';
import { connect } from 'umi';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalForm = (props) => {
  const {
    SysRoleModel: { modalVisible, role },
    dispatch,
  } = props;

  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch({ type: 'SysRoleModel/changeVisibleReducer', payload: false });
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const formValue = { ...role, ...fieldsValue };

    if (formValue.id) await dispatch({ type: 'SysRoleModel/updateEffect', payload: formValue });
    else await dispatch({ type: 'SysRoleModel/saveEffect', payload: formValue });

    dispatch({ type: 'SysRoleModel/listEffect' });
    onCancel();
  };

  /**
   * 校验角色编码是否可用
   */
  const validatorCode = (rule, value, callback) => {
    if (value) {
      dispatch({
        type: 'SysRoleModel/checkCodeEffect',
        payload: { id: role.id, code: value}
      }).then((result) => {
        if (result) callback();
        else callback("角色编码已被使用");
      });
    } else {
      callback();
    }
  };

  return (
    <Modal
      destroyOnClose
      title={role.id ? '修改角色信息' : '新建角色信息'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form
        initialValues={{
          name: role.name,
          code: role.code,
          remark: role.remark,
        }}
        form={form}>
        <FormItem
          {...formItemLayout}
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入角色名称!' }]}
        >
          <Input maxLength={20} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="角色编码"
          name="code"
          rules={[{ required: true, message: '请输入角色编码!' }, { validator: validatorCode }]}
        >
          <Input maxLength={20} />
        </FormItem>
        <FormItem {...formItemLayout} label="角色说明" name="remark">
          <TextArea rows={4} maxLength={200} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default connect(({ SysRoleModel }) => ({
  SysRoleModel,
}))(ModalForm);
