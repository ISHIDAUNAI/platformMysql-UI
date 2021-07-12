import React, {useEffect, useState} from 'react';
import { Tree, } from 'antd';
import { list } from '@/services/sys/resource';
import {buildData} from "./util";
import {
  PoweroffOutlined,
  BlockOutlined,
  WindowsOutlined,
  BarsOutlined,
} from '@ant-design/icons';

const SelectMenu = (props) => {
  const {
    onSelect
  } = props;

  const [treeData, handleTreeData] = useState([]);
  const [selectSystemId, handleSelectSystemId] = useState([]);

  useEffect( () => {
    const lostData = async () => {
      const response = await list('MENU');
      const d = buildData(response.result);

      handleTreeData(d)
      return d;
    };

    lostData().then(d => {
      if (d && d.length > 0) {
        handleSelectSystemId([d[1].id])
        onSelect(d[1])
      }
    })
  }, []);

  const handleSelect = (selectedKeys, { selected, node }) => {
    onSelect(node)
    handleSelectSystemId(selectedKeys)
  }

  return (
    <Tree
      onSelect={handleSelect}
      treeData={treeData}
      selectedKeys={selectSystemId}
      showIcon={true}
      icon={(props) => {
        if (props.disabled) return ( <BarsOutlined /> )

        if (props.type === 'SYSTEM') return ( <WindowsOutlined /> );
        if (props.type === 'MENU') return ( <BlockOutlined /> );
        if (props.type === 'BUTTON') return ( <PoweroffOutlined /> );

        return null;
      }}
    />
  )
}

export default SelectMenu;
