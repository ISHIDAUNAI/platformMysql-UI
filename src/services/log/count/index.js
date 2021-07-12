import request from '@/utils/request';

/**
 * 登录次数统计
 * @param params
 * @returns {Promise<any>}
 */
export async function login() {
  return request('/zhHealth/log/count/login');
}

/**
 * 操作日志统计
 * @param year
 * @returns {Promise<any>}
 */
export async function handle(year) {
  return request(`/zhHealth/log/count/handle/${year}`);
}
