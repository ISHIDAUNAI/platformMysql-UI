import React, {useEffect, useState} from 'react';
import { Radio } from 'antd';
import {treeByParentValue} from '@/services/sys/dict';

const RadioDict = (props) => {
  const {parentValue, onChange, value} = props;

  const [treeDate, handleTreeDate] = useState([]);
  const [dictValue, handleDictValue] = useState(null);

  useEffect( () => {
    const lostData = async () => {
      const data = await treeByParentValue(parentValue);
      handleTreeDate(data.result)
    };

    lostData().then(() =>{
      handleDictValue(value)
    });
  }, []);

  const selectItem = (e) => {
    handleDictValue(e.target.value)
    onChange(e)
  }

  const radios = treeDate.map(dict => <Radio value={dict.value}> {dict.label} </Radio>);

  return (
    <Radio.Group value={dictValue} onChange={selectItem}>
      {radios}
    </Radio.Group>
  )
};

export default RadioDict;
