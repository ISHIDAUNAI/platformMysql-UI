import React from 'react';
import { connect } from 'umi';
import { Modal, Form, Input, Row, Col, Upload, DatePicker, Radio, message } from 'antd';
import { PlusOutlined, } from '@ant-design/icons';
import {SelectRole} from '@/components/sys/Role'
import {TreeSelectDept} from '@/components/sys/Dept'
import styles from './index.less';
import {getAccessToken} from "@/utils/token";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalForm = (props) => {

  const {
    SysUserModel: { modalVisible, user, searchForm },
    dispatch,
  } = props;

  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch({ type: 'SysUserModel/changeVisibleReducer', payload: false });
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const formValue = { ...user, ...fieldsValue };

    if (formValue.id) await dispatch({ type: 'SysUserModel/updateEffect', payload: formValue });
    else await dispatch({ type: 'SysUserModel/saveEffect', payload: formValue });

    dispatch({ type: 'SysUserModel/PageEffect', payload: searchForm});
    onCancel();
  };

  const validatorUserName = (rule, value, callback) => {
    if (value) {
      dispatch({
        type: 'SysUserModel/checkUserNameEffect',
        payload: { id: user.id, userName: value}
      }).then((result) => {
        if (result) callback();
        else callback("用户登陆名称已被使用");
      });
    } else {
      callback();
    }
  };

  const handleUploadChange = (info) => {
    form.setFieldsValue({photo: ''})

    if (info.file && info.file.response) {
      const data = info.file.response

      if (data.isSuccess) {
        form.setFieldsValue({photo: data.result})
      } else {
        message.error('上传用户头像失败!');
      }
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传JPG或PNG格式的用户头像!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('请上传2M内的用户头像!');
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <Modal
      destroyOnClose
      title={user.id ? '修改用户信息' : '新建用户信息'}
      visible={modalVisible}
      width={800}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form initialValues={user} form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.photo !== currentValues.photo}
            >
              {({ getFieldValue }) => {
                return (
                  <FormItem name="photo">
                    <Upload
                      listType="picture-card"
                      className={styles.avatarUploader}
                      showUploadList={false}
                      action="/zhHealth/sys/user/uploadPhoto"
                      headers={{Authorization: `Bearer ${getAccessToken()}`}}
                      beforeUpload={beforeUpload}
                      onChange={handleUploadChange}
                    >
                      {
                        getFieldValue('photo') ?
                          <img src={form.getFieldValue('photo')} alt="avatar" /> :
                          <div> <PlusOutlined /> <div className="ant-upload-text">上传用户头像</div>  </div>
                      }
                    </Upload>
                  </FormItem>
                )
              }}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="用户名称"
              name="userName"
              rules={[{ required: true, message: '请输入用户名称!' }, { validator: validatorUserName }]}
            >
              <Input maxLength={20} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="登陆密码"
              name="password"
              rules={[{ required: true, message: '请输入至少6位的登陆密码!', min: 6 }]}
            >
              <Input.Password visibilityToggle={false} disabled={user.id && user.id !== null} maxLength={200}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="真实姓名"
              name="realName"
              rules={[{ required: true, message: '请输入真实姓名!' }]}
            >
              <Input maxLength={20} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
              name="phone"
              rules={[{ required: true, message: '请输入正确格式的手机号码!', pattern: /^1[0-9][0-9]\d{8}$/ }]}
            >
              <Input maxLength={20} />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="出生日期"
              name="birthday"
              rules={[{ required: true, message: '请选择出生日期!' }]}
            >
              <DatePicker style={{width: '100%'}}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户性别"
              name="sex"
              rules={[{ required: true, message: '请选择用户性别!' }]}
            >
              <Radio.Group>
                <Radio value='MAN'> 男 </Radio>
                <Radio value='WOMAN'> 女 </Radio>
              </Radio.Group>
            </FormItem>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="用户角色"
              name="roleIdList"
              rules={[{ required: true, message: '请选择用户角色!' }]}
            >
              <SelectRole multiple/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="归属部门"
              name="deptIdList"
              rules={[{ required: true, message: '请选择用户归属部门!' }]}
            >
              <TreeSelectDept multiple/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default connect(({ SysUserModel }) => ({
  SysUserModel,
}))(ModalForm);
