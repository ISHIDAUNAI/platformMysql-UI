import request from '@/utils/request';

export async function page(params) {
  return request('/zhHealth/log/handle/page', {
    params,
  });
}
