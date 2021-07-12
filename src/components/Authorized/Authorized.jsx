import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'umi';
import check from './CheckPermissions';

const Authorized = ({
  children,
  authority,
  noMatch = (
    <Result
      status="403"
      title="403"
      subTitle="2 Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link to="/user/login">Go Login</Link>
        </Button>
      }
    />
  ),
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
