import React from 'react';
import { Redirect } from 'umi';
import { getCurrentSystem } from '@/utils/token';

const RedirectLayout = (props) => {
  const currentSystem = getCurrentSystem();
  if (currentSystem) {
    return <Redirect to={currentSystem.indexPath} />;
  }

  return <Redirect to="/user/login" />;
}

export default RedirectLayout;
