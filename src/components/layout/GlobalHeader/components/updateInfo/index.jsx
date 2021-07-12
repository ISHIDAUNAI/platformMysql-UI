import React from 'react';
import { Modal, Form, Upload, Input, message, Row, Col, DatePicker, Radio, } from 'antd';
import {removeToken, getUser, getAccessToken} from "@/utils/token";
import styles from "./index.less";
import { PlusOutlined, } from '@ant-design/icons';
import moment from 'moment';
import {modify, } from '@/services/sys/user';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ModalUpdateInfo = (props) => {
  const {updateInfoVisible, onCancel} = props
  const userInfo = {...getUser(), ...{birthday: moment(getUser().birthday)}};
  const [form] = Form.useForm();

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const formValue = { ...userInfo, ...fieldsValue };

    const res = await modify(formValue);

    if (res.result) {
      message.success("修改个人信息成功，请重新登录！");
      onCancel();

      removeToken();
      window.location.href = '/user/login';
    } else {
      message.error(res.message);
    }
  }

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
      okText='修改'
      centered
      destroyOnClose
      title='修改个人信息'
      visible={updateInfoVisible}
      onOk={okHandle}
      onCancel={onCancel}
      width={800}
    >
      <Form initialValues={userInfo} form={form}>
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
              rules={[{ required: true, message: '请输入用户名称!' }]}
            >
              <Input maxLength={20} disabled/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="登陆密码"
              name="password"
              rules={[{ required: true, message: '请输入至少6位的登陆密码!', min: 6 }]}
            >
              <Input.Password visibilityToggle={false} disabled maxLength={200}/>
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
      </Form>
    </Modal>
  );
}

export default ModalUpdateInfo;
