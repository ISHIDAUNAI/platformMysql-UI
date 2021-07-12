import request from '@/utils/request';

/**
 * 根据上级资源id，获取按钮权限信息
 * @param parentId 上级资源id
 * @returns {Promise<any>}
 */
export async function listByParentId(parentId) {
  return request(`/zhHealth/sys/button/listByParentId/${parentId}`, {
    method: 'GET',
  });
}

/**
 * save
 * @param params params
 * @returns {Promise<any>}
 */
export async function save(params) {
  return request('/zhHealth/sys/button/save', {
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
  return request('/zhHealth/sys/button/update', {
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
  return request(`/zhHealth/sys/button/remove/${id}`, {
    method: 'DELETE',
  });
}
