/**
 * 根据id、parentId 构建树结构数据
 * @param nodeList list 数据
 * @returns {[]} 树结构数据
 */
const treeBuild = (nodeList) => {
  const treeList = [];
  nodeList.forEach(node => {
    if (node.parentId === null || node.parentId === 0 || node.parentId === '0') {
      treeList.push(node)
    }

    nodeList.forEach(nodeChildren => {
      if (nodeChildren.parentId === node.id) {
        node.children.push(nodeChildren);
      }
    });
  });

  return treeList;
};

/**
 * 将dataList转为树形结构数据
 * @param dataList dataList
 * @param params 构建数的参数
 *    keyLabel: 树结构数据的key名
 *    key: dataList数据中的主键字段名称
 *    titleLabel: 树结构数据的title名
 *    title: dataList数据中的显示名称的字段名称
 * @returns {[]|*[]}
 */
export const buildTreeData = ( dataList, params = {keyLabel:'key', key:'id', titleLabel:'title', title:'name'} ) => {
  if (!Array.isArray(dataList)) return [];

  const {keyLabel, key, titleLabel, title} =  { ...{keyLabel:'key', key:'id', titleLabel:'title', title:'name'}, ...params};

  const nodeList = [];
  dataList.forEach(node => {
    const nodeData = { ...node, ...{children: [] }};
    nodeData[keyLabel] = node[key];
    nodeData[titleLabel] = node[title];

    nodeList.push(nodeData);
  });

  return treeBuild(nodeList)
};
