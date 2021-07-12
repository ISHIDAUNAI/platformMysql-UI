import request from '@/utils/request';

/**
 * 获取所有机构部门信息
 * @returns {Promise<any>}
 */
export async function list() {
  return request('/zhHealth/sys/dept/list');
}

/**
 * save
 * @param params params
 * @returns {Promise<any>}
 */
export async function save(params) {
  return request('/zhHealth/sys/dept/save', {
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
  return request('/zhHealth/sys/dept/update', {
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
  return request(`/zhHealth/sys/dept/remove/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 校验部门编码是否可用
 * @param params 部门信息
 * @returns {Promise<any>} true 编码可用
 */
export async function checkCode(params) {
  return request('/zhHealth/sys/dept/checkCode', {
    method: 'POST',
    data: params,
  });
}
