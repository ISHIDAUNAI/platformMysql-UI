import request from '@/utils/request';

/**
 * tree
 * @param params params
 * @returns {Promise<any>}
 */
export async function tree(params) {
  return request('/zhHealth/sys/dict/tree', {
    params,
  });
}

/**
 * list
 * @returns {Promise<any>}
 */
export async function list() {
  return request('/zhHealth/sys/dict/list');
}

/**
 * save
 * @param params params
 * @returns {Promise<any>}
 */
export async function save(params) {
  return request('/zhHealth/sys/dict/save', {
    method: 'POST',
    data: params,
  });
}

/**
 * update
 * @param params params
 * @returns {Promise<any>}
 */
export async function update(params) {
  return request('/zhHealth/sys/dict/update', {
    method: 'PUT',
    data: params,
  });
}

/**
 * remove
 * @param id id
 * @returns {Promise<any>}
 */
export async function remove(id) {
  return request(`/zhHealth/sys/dict/remove/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 检验字典值是否可用
 * @param params params
 * @returns {Promise<any>} true 可用
 */
export async function checkValue(params) {
  return request('/zhHealth/sys/dict/checkValue', {
    method: 'POST',
    data: params,
  });
}

/**
 * 根据父节点信息，获取节点下的所有层级的字典信息
 * @param parentValue 父节点value
 * @returns {Promise<any>} 字典树信息
 */
export async function treeByParentValue(parentValue) {
  return request(`/zhHealth/sys/dict/treeByParentValue/${parentValue}`, {
    method: 'GET',
  });
}
