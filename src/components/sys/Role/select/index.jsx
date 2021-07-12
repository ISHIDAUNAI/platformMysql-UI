import React, {useEffect, useState} from 'react';
import { Select } from 'antd';
import { list } from '@/services/sys/role';

const { Option } = Select;

/**
 * 选择角色信息
 * @param props
 *    multiple 多选模式
 * @returns {*}
 * @constructor
 */
const SelectRole = (props) => {
  const {onChange, value, placeholder, multiple} = props;

  const [listDate, handleListDate] = useState([]);
  const [roleValue, handleRoleValue] = useState(undefined);

  useEffect( () => {
    const lostData = async () => {
      const data = await list();
      handleListDate(data.result)
    };

    lostData().then(() =>{
      handleRoleValue(value || undefined)
    });
  }, []);

  const selectItem = (e) => {
    handleRoleValue(e)
    onChange(e)
  }

  const options = listDate.map(role => <Option key={role.id} value={role.id}> {role.name} </Option>);

  return (
    multiple ? (
      <Select onChange={selectItem} mode='multiple' value={roleValue} placeholder={placeholder}>
        {options}
      </Select>
    ) : (
      <Select onChange={selectItem} value={roleValue} placeholder={placeholder}>
        {options}
      </Select>
    )
  )
}

export default SelectRole;
