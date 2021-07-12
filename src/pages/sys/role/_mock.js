
function fakeList() {
  const list = [
    {id: '1', name: '超级管理员', code : 'admin', img: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', desc: '系统管理员，拥有系统级别的角色。系统管理员，拥有系统级别的角色。系统管理员，拥有系统级别的角色。系统管理员，拥有系统级别的角色。系统管理员，拥有系统级别的角色。'},
    {id: '2', name: '运维人员', code : 'yunWei', img: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', desc: '运维系统角色，拥有系统业务配置权限。'},
  ];

  return list;
}

function getRoleList(req, res) {
  const result = fakeList();
  return res.json(result);
}

export default {
  'GET /api/sys/role/list': getRoleList,
};
