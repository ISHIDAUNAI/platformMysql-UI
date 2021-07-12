import React, {useEffect, useState} from 'react';
import { TreeSelect } from 'antd';
import { buildData } from './util';

import { list } from '@/services/sys/resource';

const TreeSelectResource = (props) => {
  const {onChange, value, multiple, placeholder, type, resourceId} = props;

  const [treeSelectData, handleTreeSelectData] = useState([]);
  const [resourceValue, handleResourceValue] = useState(undefined);

  useEffect( () => {
    const lostData = async () => {
      const response = await list(type);
      handleTreeSelectData(buildData(response.result, resourceId))
    };

    lostData().then(() =>{
      handleResourceValue(value || undefined)
    });
  }, []);

  const selectItem = (e) => {
    handleResourceValue(e)
    onChange(e)
  }

  return (
    <TreeSelect
      multiple={multiple}
      showSearch
      style={{ width: '100%' }}
      value={resourceValue}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeSelectData}
      onChange={selectItem}
      placeholder={placeholder}
    />
  )
}

export default TreeSelectResource;
