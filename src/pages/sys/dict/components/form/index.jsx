import React from 'react';
import { Form, Input, Modal, message, InputNumber } from 'antd';
import {save, update, checkValue} from "@/services/sys/dict";

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalForm = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit, onCancel, values } = props;

  const saveHandle = async (formValue) => {
    const data = await save(formValue);

    if (data.result) message.success('新建字典信息成功!');
    else message.error('新建字典信息失败!');
  };

  const updateHandle = async (formValue) => {
    const data = await update(formValue);

    if (data.result) message.success('修改字典信息成功!');
    else message.error('修改字典信息失败!');
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();

    const formValue = { ...values, ...fieldsValue };
    if (formValue.id) await updateHandle(formValue);
    else await saveHandle(formValue);

    onSubmit();
  };

  const validatorValue = (rule, value, callback) => {
    if (value) {
      checkValue({ id: values.id, value: value }).then((data) => {
        if (!data.result) callback('字典键值已被使用!');
        callback();
      });
    } else {
      callback();
    }
  };

  return (
    <Modal
      destroyOnClose
      title={values.id ? '修改字典信息' : '新建字典信息'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form
        initialValues={{
          parentId: values.parentId,
          parentLabel: values.parentLabel,
          label: values.label,
          value: values.value,
          sort: values.sort ? values.sort : 1,
          remark: values.remark,
        }}
        form={form}
      >
        {values.parentLabel ? (
          <FormItem
            {...formItemLayout}
            label="上级字典"
            name="parentLabel"
          >
            <Input disabled/>
          </FormItem>
        ) : null }
        <FormItem
          {...formItemLayout}
          label="字典标签"
          name="label"
          rules={[{ required: true, message: '请输入字典标签!' }]}
        >
          <Input maxLength={40} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="字典键值"
          name="value"
          rules={[{ required: true, message: '请输入字典键值!' }, { validator: validatorValue }]}
        >
          <Input maxLength={40} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="字典排序"
          name="sort"
          rules={[{ required: true, message: '请输入字典排序!' }]}
        >
          <InputNumber min={1} max={1000} defaultValue={1} style={{ width: '100%' }} />
        </FormItem>
        <FormItem {...formItemLayout} label="字典备注" name="remark">
          <TextArea rows={4} maxLength={200} />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default ModalForm;
