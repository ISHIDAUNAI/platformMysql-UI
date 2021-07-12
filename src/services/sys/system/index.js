import request from '@/utils/request';

/**
 * 查询所有系统信息
 * @returns {Promise<any>}
 */
export async function listAll() {
  return request('/zhHealth/sys/system/listAll')
}

/**
 * save
 * @param params params
 * @returns {Promise<any>}
 */
export async function save(params) {
  return request('/zhHealth/sys/system/save', {
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
  return request('/zhHealth/sys/system/update', {
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
  return request(`/zhHealth/sys/system/remove/${id}`, {
    method: 'DELETE',
  });
}
