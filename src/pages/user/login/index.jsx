import { Alert, } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import styles from './style.less';
import LoginFrom from './components/Login';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userAndlogin = {}, submitting } = props;
  const { status, type: loginType } = userAndlogin;
  const [type, setType] = useState('account');

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === false && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误" />
          )}

          <UserName
            name="userName"
            placeholder="请输入登陆名称"
            rules={[ { required: true, message: '请输入登陆名称!', }, ]}
          />
          <Password
            name="password"
            placeholder="请输入登陆密码"
            rules={[ { required: true, message: '请输入登陆密码！', }, ]}
          />
        </Tab>
        <Tab key="mobile" tab="手机号登录">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="验证码错误" />
          )}
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              { required: true, message: '请输入手机号！', },
              { pattern: /^1\d{10}$/, message: '手机号格式错误！', },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[ { required: true, message: '请输入验证码！', }, ]}
          />
        </Tab>

        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))(Login);
