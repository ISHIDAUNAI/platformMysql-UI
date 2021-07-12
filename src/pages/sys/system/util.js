export const convertToGroupList = (list) => {
  const systemList = Array.isArray(list) ? list : []

  const dataJson = {};
  systemList.forEach(data => {
    if (dataJson[data.typeName]) dataJson[data.typeName].push(data);
    else dataJson[data.typeName] = [data]
  })

  const dataList = []
  Object.keys(dataJson).forEach(key => {
    dataList.push({ typeName: key, systemList: dataJson[key] })
  })

  return dataList;
}
