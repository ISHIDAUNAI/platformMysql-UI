import request from '@/utils/request';

/**
 * 获取所有角色信息
 * @returns {Promise<any>}
 */
export async function list() {
  return request('/zhHealth/sys/role/list');
}

/**
 * save
 * @param params params
 * @returns {Promise<any>}
 */
export async function save(params) {
  return request('/zhHealth/sys/role/save', {
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
  return request('/zhHealth/sys/role/update', {
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
  return request(`/zhHealth/sys/role/remove/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 校验角色编码是否可用
 * @param params 角色信息
 * @returns {Promise<any>} true 编码可用
 */
export async function checkCode(params) {
  return request('/zhHealth/sys/role/checkCode', {
    method: 'POST',
    data: params,
  });
}
