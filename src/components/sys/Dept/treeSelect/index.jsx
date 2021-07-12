import React, {useEffect, useState} from 'react';
import { TreeSelect } from 'antd';
import { buildTreeData } from '@/utils/common';
import { list } from '@/services/sys/dept';

/**
 * 选择部门信息
 * @param props
 *    multiple 多选
 * @returns {*}
 * @constructor
 */
const TreeSelectDept = (props) => {
  const {onChange, value, multiple, placeholder} = props;

  const [treeSelectData, handleTreeSelectData] = useState([]);
  const [deptValue, handleDeptValue] = useState(undefined);

  useEffect( () => {
    const lostData = async () => {
      const response = await list();
      handleTreeSelectData(buildTreeData(response.result, {keyLabel: 'value'}))
    };

    lostData().then(() =>{
      handleDeptValue(value || undefined)
    });
  }, []);

  const selectItem = (e) => {
    handleDeptValue(e)
    onChange(e)
  }

  return (
    <TreeSelect
      multiple={multiple}
      showSearch
      style={{ width: '100%' }}
      value={deptValue}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeSelectData}
      onChange={selectItem}
      placeholder={placeholder}
    />
  )
}

export default TreeSelectDept;
