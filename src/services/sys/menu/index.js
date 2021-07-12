import request from '@/utils/request';

/**
 * 获取菜单树
 * @param parentId 上级资源id（sys_resource.id）
 * @returns {Promise<any>}
 */
export async function tree(parentId) {
  return request(`/zhHealth/sys/menu/tree/${parentId}`, {
    method: 'GET',
  });
}

/**
 * save
 * @param params params
 * @returns {Promise<any>}
 */
export async function save(params) {
  return request('/zhHealth/sys/menu/save', {
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
  return request('/zhHealth/sys/menu/update', {
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
  return request(`/zhHealth/sys/menu/remove/${id}`, {
    method: 'DELETE',
  });
}
