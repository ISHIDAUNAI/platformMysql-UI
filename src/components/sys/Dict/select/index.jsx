import React, {useEffect, useState} from 'react';
import { Select } from 'antd';
import {treeByParentValue} from '@/services/sys/dict';

const { Option } = Select;

const SelectDict = (props) => {
  const {parentValue, onChange, value, placeholder} = props;

  const [treeDate, handleTreeDate] = useState([]);
  const [dictValue, handleDictValue] = useState(undefined);

  useEffect( () => {
    const lostData = async () => {
      const data = await treeByParentValue(parentValue);
      handleTreeDate(data.result)
    };

    lostData().then(() =>{
        handleDictValue(value || undefined)
    });
  }, []);

  const selectItem = (e) => {
    handleDictValue(e)
    onChange(e)
  }

  const options = treeDate.map(dict => <Option key={dict.value}> {dict.label} </Option>);

  return (
    <Select onSelect={selectItem} value={dictValue} placeholder={placeholder}>
      {options}
    </Select>
  )
};

export default SelectDict;
