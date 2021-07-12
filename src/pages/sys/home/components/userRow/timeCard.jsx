import React, { useState, useEffect } from "react";
import { Card, } from 'antd';
import styles from '../../index.less';
import moment from 'moment';
import { connect } from 'umi';

const SysHomeUserRowTimeCard = (props) => {
  const { loading, } = props;

  const [current, handleCurrent] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      handleCurrent(new Date())
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      loading={loading}
      bodyStyle={{
        padding: '20px 24px 8px 24px',
        height: '182px'
      }}
      className={styles.timeCard}
    >
      <div className={styles.date}>{moment(current).format('YYYY-MM-DD')}</div>
      <div className={styles.time}>{moment(current).format('HH:mm:ss')}</div>
    </Card>
  );
}

export default connect(({ loading }) => ({
  loading: loading.models.SysHomeModel,
}))( SysHomeUserRowTimeCard )
