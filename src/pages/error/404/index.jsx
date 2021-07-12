import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

/**
 * 访问的页面不存在时，展示该页面，
 * @returns {*}
 * @constructor
 */
const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default NoFoundPage;
