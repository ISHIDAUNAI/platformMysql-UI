import React from 'react';
import { Form, Input, Modal, Radio, message } from 'antd';
import {SelectDict} from '@/components/sys/Dict'
import { checkName, checkRule, checkClassName, save, update } from '@/services/sys/task';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalForm = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit, onCancel, values } = props;

  /**
   * 新增任务
   * @param formValue 任务信息
   * @returns {Promise<void>}
   */
  const saveHandle = async (formValue) => {
    const data = await save(formValue);

    if (data.result) message.success('新建任务成功!');
    else message.error('新建任务失败!');
  };

  /**
   * 修改任务
   * @param formValue 任务信息
   * @returns {Promise<void>}
   */
  const updateHandle = async (formValue) => {
    const data = await update(formValue);

    if (data.result) message.success('修改任务成功!');
    else message.error('修改任务失败!');
  };

  /**
   * 确定操作
   * @returns {Promise<void>}
   */
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();

    const formValue = { ...values, ...fieldsValue };
    if (formValue.id) await updateHandle(formValue);
    else await saveHandle(formValue);

    onSubmit();
  };

  /**
   * 校验任务名称是否重复
   * @param rule rule
   * @param value value
   * @param callback callback
   */
  const validatorName = (rule, value, callback) => {
    if (value) {
      checkName({ id: values.id, name: value }).then((data) => {
        if (!data.result) callback('任务名称已被使用!');
        callback();
      });
    } else {
      callback();
    }
  };

  /**
   * 验证定时任务规则表达式
   * @param rule rule
   * @param value value
   * @param callback callback
   */
  const validatorRule = (rule, value, callback) => {
    if (value) {
      checkRule(value).then((data) => {
        if (!data.result) callback('请输入正确的定时规则!');
        callback();
      });
    } else {
      callback();
    }
  };

  /**
   * 校验任务类是否可用
   * @param rule rule
   * @param value value
   * @param callback callback
   */
  const validatorClassName = (rule, value, callback) => {
    if (value) {
      checkClassName({ id: values.id, className: value }).then((data) => {
        if (!data.result) callback('任务类不存在或已被使用!');
        callback();
      });
    } else {
      callback();
    }
  };

  return (
    <Modal
      destroyOnClose
      title={values.id ? '修改定时任务' : '新建定时任务'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form
        initialValues={{
          name: values.name,
          group: values.group,
          rule: values.rule,
          className: values.className,
          usedState: values.usedState ? values.usedState : 'YES',
        }}
        form={form}
      >
        <FormItem
          {...formItemLayout}
          label="任务名称"
          name="name"
          rules={[{ required: true, message: '请输入任务名称!' }, { validator: validatorName }]}
        >
          <Input maxLength={10} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="任务分组"
          name="group"
          rules={[{ required: true, message: '请输入任务分组！' }]}
        >
          <SelectDict parentValue="sys_task_group"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="定时规则"
          name="rule"
          rules={[{ required: true, message: '请输入定时规则！' }, { validator: validatorRule }]}
        >
          <Input maxLength={50} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="任务类名"
          name="className"
          rules={[
            { required: true, message: '请输入任务类名！' },
            { validator: validatorClassName },
          ]}
        >
          <Input maxLength={200} />
        </FormItem>
        <FormItem {...formItemLayout} label="启用状态" name="usedState">
          <RadioGroup>
            <Radio value="YES">启用</Radio>
            <Radio value="NO">停用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default ModalForm;
