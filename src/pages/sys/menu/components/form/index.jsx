import React from 'react';
import { connect } from 'umi';
import { Modal, Form, Input, InputNumber, Radio, } from 'antd';
import {TreeSelectResource} from '@/components/sys/Resource'

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalForm = (props) => {
  const {
    SysMenuModel: { modalVisible, menu },
    refresh,
    dispatch,
  } = props;

  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch({ type: 'SysMenuModel/modalVisibleReducer', payload: false });
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const formValue = { ...menu, ...fieldsValue };

    if (formValue.id) await dispatch({ type: 'SysMenuModel/updateEffect', payload: formValue });
    else await dispatch({ type: 'SysMenuModel/saveEffect', payload: formValue });

    refresh()

    onCancel();
  }

  return (
    <Modal
      destroyOnClose
      title={menu.id ? '修改菜单资源信息' : '新建菜单资源信息'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form initialValues={menu} form={form}>
        <FormItem
          {...formItemLayout}
          label="上级资源"
          name="parentId"
          rules={[{ required: true, message: '请选择上级资源!' }]}
        >
          <TreeSelectResource type='MENU' resourceId={menu.id}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
        >
          <Input maxLength={10} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜单图标"
          name="icon"
        >
          <Input maxLength={100} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="访问路径"
          name="path"
          rules={[{ required: true, message: '请输入访问路径!' }]}
        >
          <Input maxLength={100} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="组件路径"
          name="component"
        >
          <Input maxLength={100} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜单排序"
          name="sort"
          rules={[{ required: true, message: '请输入菜单排序!' }]}
        >
          <InputNumber min={1} max={1000} defaultValue={1} style={{ width: '100%' }} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否主页"
          name="isIndex"
          rules={[{ required: true, message: '请选择是否为主页!' }]}
        >
          <Radio.Group>
            <Radio value='YES'> 是 </Radio>
            <Radio value='NO'> 否 </Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="展示方式"
          name="showType"
          rules={[{ required: true, message: '请选择展示方式!' }]}
        >
          <Radio.Group>
            <Radio value='HOME'> HOME </Radio>
            <Radio value='SCREEN'> SCREEN </Radio>
          </Radio.Group>
        </FormItem>
        <FormItem {...formItemLayout} label="菜单备注" name="remark">
          <TextArea rows={4} maxLength={200} />
        </FormItem>
      </Form>
    </Modal>
  );
}

export default connect(({ SysMenuModel }) => ({
  SysMenuModel,
}))(ModalForm);
