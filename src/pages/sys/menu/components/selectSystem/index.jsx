import React, {useEffect, useState} from 'react';
import {Menu,} from 'antd';
import { listAll } from '@/services/sys/system';
import {convertToGroupList} from '@/pages/sys/system/util'

const SelectSystem = (props) => {
  const { onChange } = props;

  const [systemKeys, handleSystemKeys] = useState([]);
  const [list, handleList] = useState([]);

  useEffect(() => {
    const lostData = async () => {
      const response = await listAll();
      return convertToGroupList(response.result);
    }

    lostData().then(dataList =>{
      handleList(dataList)

      if (dataList && dataList.length > 0) {
        const resourceId = dataList[0].systemList[0].resourceId;
        const name = dataList[0].systemList[0].name;

        handleSystemKeys([resourceId.toString()])
        onChange({systemResourceId: resourceId, systemName: name})
      }
    });
  }, []);

  const clickMenuHandle = ({ item, key }) => {
    handleSystemKeys([key.toString()])
    onChange({systemResourceId: key, systemName: item.props.children[item.props.children.length - 1]})
  }

  const itemContent = (systemList) => {
    return systemList.map(data => {
      return (
        <Menu.Item key={data.resourceId}>{data.name}</Menu.Item>
      )
    })
  }

  const itemGroupContent = list.map(data => {
    return (
      <Menu.ItemGroup key={data.typeName} title={data.typeName}>
        {itemContent(data.systemList)}
      </Menu.ItemGroup>
    )
  });

  return (
    <Menu
      mode="inline"
      onClick={clickMenuHandle}
      selectedKeys={systemKeys}
    >
      {itemGroupContent}
    </Menu>
  )
}

export default SelectSystem;
