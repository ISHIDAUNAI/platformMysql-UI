import request from '@/utils/request';

/**
 * 获取角色以授权的资源id
 * @param roleId 角色id
 * @returns {Promise<any>}
 */
export async function findRidByRole(roleId) {
  return request(`/zhHealth/sys/role/resource/findRidByRole/${roleId}`);
}

/**
 * 为角色授权
 * @param roleId 角色id
 * @param rIds 资源id集合
 * @returns {Promise<any>}
 */
export async function auth(params) {
  return request('/zhHealth/sys/role/resource/auth', {
    params
  });
}
