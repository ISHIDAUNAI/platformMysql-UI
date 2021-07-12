import request from '@/utils/request';

/**
 * 获取分页数据
 * @param params params
 * @returns {Promise<any>}
 */
export async function page(params) {
  return request('/zhHealth/sys/user/page', {
    params,
  });
}

/**
 * remove
 * @param id id
 * @returns {Promise<any>}
 */
export async function remove(id) {
  return request(`/zhHealth/sys/user/remove/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 停用用户
 * @param id 用户id
 * @returns {Promise<any>}
 */
export async function pause(id) {
  return request(`/zhHealth/sys/user/pause/${id}`);
}

/**
 * 启用用户
 * @param id 用户id
 * @returns {Promise<any>}
 */
export async function resume(id) {
  return request(`/zhHealth/sys/user/resume/${id}`);
}

/**
 * 校验用户登录名是否可用
 * @param params 用户id及登陆名称信息
 * @returns {Promise<any>} true 登陆名称可用
 */
export async function checkUserName(params) {
  return request('/zhHealth/sys/user/checkUserName', {
    method: 'POST',
    data: params,
  });
}

/**
 * save
 * @param params params
 * @returns {Promise<any>}
 */
export async function save(params) {
  return request('/zhHealth/sys/user/save', {
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
  return request('/zhHealth/sys/user/update', {
    method: 'PUT',
    data: params,
  });
}

/**
 * 修改个人信息
 * @param params params
 * @returns {Promise<any>}
 */
export async function modify(params) {
  return request('/zhHealth/sys/user/modify', {
    method: 'PUT',
    data: params,
  });
}

/**
 * 修改用户登陆密码
 * @param params 用户id、登陆密码
 * @returns {Promise<any>}
 */
export async function updatePassword(params) {
  return request('/zhHealth/sys/user/updatePassword', {
    method: 'POST',
    data: params,
  });
}

/**
 * 当前登录人修改自己的登录密码
 * @param params params
 * @returns {Promise<any>}
 */
export async function modifyPassword(params) {
  return request('/zhHealth/sys/user/modifyPassword', {
    method: 'POST',
    data: params,
  });
}

/**
 * 校验原始密码是否正确
 * @param params params
 * @returns {Promise<any>}
 */
export async function checkPassword(oldPassword) {
  return request('/zhHealth/sys/user/checkPassword', {
    method: 'POST',
    data: {
      oldPassword
    },
  });
}
