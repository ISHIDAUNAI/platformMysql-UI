import React, { useEffect, useState } from "react";
import { Card, Col, Row, DatePicker, } from 'antd';
import {MiniRank, Bar} from '@/components/common/Charts';
import { connect } from 'umi';
import moment from 'moment';
import { handle } from '@/services/log/count';

const SysHomeLogRow = (props) => {
  const { loading, } = props;
  const [log, handleLog] = useState({monthList: [], rankList: []});
  const [year, handleYear] = useState(moment(new Date()));

  useEffect(() => {
    const lostData = async () => {
      const response = await handle(year.format('YYYY'));
      handleLog(response.result)
    };

    lostData();
  }, [year]);

  const onChange = (date) => {
    handleYear(date);
  }

  return (
    <Card
      loading={loading}
      title="操作日志数量统计"
      bodyStyle={{
        height: '270px'
      }}
      extra={
        <>
          日志操作年份：
          <DatePicker value={year} onChange={onChange} picker="year" />
        </>
      }
    >
      <Row gutter={48}>
        <Col span={19}>
          <Bar height={220} title='操作数量' data={log.monthList} />
        </Col>
        <Col span={5}>
          <MiniRank title="操作次数前 5 名" data={log.rankList}/>
        </Col>
      </Row>
    </Card>
  );
}

export default connect(({ loading }) => ({
  loading: loading.models.SysHomeModel,
}))( SysHomeLogRow )
