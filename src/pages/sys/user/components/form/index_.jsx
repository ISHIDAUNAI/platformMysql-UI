/*
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import {Modal, Row, Col, Upload, Input, Radio, DatePicker, Form } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const FormModal = props => {
  const {
    sysUser: { user, visible },
    form: { getFieldDecorator, validateFields },
    dispatch
  } = props;

  const handleCancel = () => {
    dispatch({
      type: 'sysUser/changeVisible',
      payload: false
    });
  };

  const handleSubmit = () => {
    validateFields((err, values) => {
      console.info(1)
      if (!err && dispatch) {
        console.info(2)
        console.info(values)
      }
    });
  }

  const formItemLayout = {
    labelCol: { span: 8, },
    wrapperCol: { span: 16, }
  };

  return (
    <Modal
      title="新增用户"
      width={800}
      destroyOnClose
      visible={visible}
      okText='保存'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form
        style={{
          marginTop: 8,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="用户头像" className={styles.uploadFormItem}>
              {
                getFieldDecorator('photo')(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className={styles.avatarUploader}
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  >
                    {
                      user.photo ?
                        <img src={user.photo} alt="avatar" style={{ width: '100%' }} />
                        :
                        <div>
                          <PlusOutlined />
                          <div className="ant-upload-text">上传用户头像</div>
                        </div>
                    }
                  </Upload>
                )
              }
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item {...formItemLayout} label="用户名称">
              {
                getFieldDecorator('userName', {
                  initialValue: user.userName,
                  rules: [ { required: true, message: "请填写用户名称" }, ],
                })( <Input /> )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="登录密码" >
              {
                getFieldDecorator('password', {
                  initialValue: user.password,
                  rules: [ { required: true, message: "请填写登录密码" }, ],
                })( <Input.Password /> )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="真实姓名" >
              {
                getFieldDecorator('realName', {
                  initialValue: user.realName,
                  rules: [ { required: true, message: "请填写真实姓名" }, ],
                })( <Input /> )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="手机号码" >
              {
                getFieldDecorator('phone', {
                  initialValue: user.phone,
                  rules: [ { required: true, message: "请填写手机号码" }, ],
                })( <Input /> )
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="出生日期" >
              {
                getFieldDecorator('birthday', {
                  initialValue: moment(user.birthday),
                  rules: [ { required: true, message: "请选择出生日期" }, ],
                })( <DatePicker style={{width: '100%'}}/> )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className={styles.radioRow}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="用户性别" >
              {
                getFieldDecorator('sex', {
                  initialValue: user.sex,
                  rules: [ { required: true, message: "请选择用户性别" }, ],
                })(
                  <Radio.Group value={user.sex}>
                    <Radio value='Man'>男</Radio>
                    <Radio value='Woman'>女</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="启用状态" >
              {
                getFieldDecorator('state', {
                  initialValue: user.state,
                  rules: [ { required: true, message: "请选择启用状态" }, ],
                })(
                  <Radio.Group value={user.state}>
                    <Radio value='Yes'>启用</Radio>
                    <Radio value='No'>禁用</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default connect(({ sysUser }) => ({
  sysUser
}))(Form.create()(FormModal));

 */
