import ProLayout, { GridContent } from '@ant-design/pro-layout';
import React from 'react';
import RightContent from '@/components/layout/GlobalHeader/RightContent';
import GlobalFooter from '@/components/layout/GlobalFooter'
import logo from '../assets/layout/logo.png';
import { Link, connect, Redirect, history } from 'umi';
import { getAccessToken, getSystem, getRoleCodeList, setCurrentSystem } from '@/utils/token';
import { Input, Row, Col, Alert, Space, Card, message, } from 'antd';
import styles from './BasicLayout.less';
import { setAuthority } from '@/utils/authority';

const GuideLayout = props => {
  if (getAccessToken() === '')  return <Redirect to='/user/login' />;

  const {
    settings,
    location = { pathname: '/', },
  } = props;

  const clickSystem = (s) =>{
    if (s.showType === 'BLANK') {
      const win = window.open(s.blankPath, '_blank');
      win.focus();

      return ;
    }

    if (s.indexPath) {
      const authList = [];
      getRoleCodeList().forEach(code => {
        authList.push(`${s.resourceId  }_${code}`)
      })
      setAuthority(authList);
      setCurrentSystem(s);

      history.replace('/');
    } else {
      message.error('系统暂未开放，敬请期待！');
    }
  }

  const list = getSystem();

  const systemContent = (systemList) => {
    return systemList.map(data => {
      return (
        <Col span={4} key={data.id}>
          <Card
            onClick={() => clickSystem(data)}
            hoverable cover={<img alt="img" src={data.icon} />}
          >
            <Card.Meta title={data.name}  />
          </Card>
        </Col>
      )
    });
  }

  const listContent = list.map(data => {
    return (
      <Space direction="vertical" size="large" style={{width: '100%'}} key={data.typeName}>
        <Alert message={data.typeName} type="info" key={data.typeName}/>

        <Row gutter={32}>
          {systemContent(data.systemList)}
        </Row>
      </Space>
    )
  });

  return (
    <ProLayout
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/guide"> {logoDom} <h1>共享智慧医疗 惠泽百姓健康 —— 站点首页</h1> </Link>
      )}
      location={location}
      logo={logo}
      {...settings}
      disableContentMargin
      rightContentRender={() => <RightContent />}
      layout="topmenu"
      footerRender={() => <GlobalFooter />}
    >
      <GridContent className={styles.guide}>
        <div className={styles.search}>
          <Row >
            <Col span={8} offset="8">
              <Input.Search placeholder="请输入搜索关键字" enterButton size="large" onSearch={value => console.log(value)} />
            </Col>
          </Row>
        </div>

        <Row className={styles.main}>
          <Col span={18} offset="3">
            <Space direction="vertical" size="large" style={{width: '100%'}} >
              {listContent}
            </Space>
          </Col>
        </Row>
      </GridContent>
    </ProLayout>
  );
}

export default connect(({ settings }) => ({
  settings,
}))(GuideLayout);
