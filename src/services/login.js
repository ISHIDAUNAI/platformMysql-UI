import request from '@/utils/request';

export async function accountLogin(params) {
  return request('/zhHealth/oauth/token', {
    method: 'POST',
    params: {
      grant_type: 'password',
      scope: 'all',
      client_id: 'ZX_HEALTH_CLIENT_ID',
      client_secret: 'ZX_HEALTH_CLIENT_SECRET',
      username: params.userName,
      password: params.password
    },
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
