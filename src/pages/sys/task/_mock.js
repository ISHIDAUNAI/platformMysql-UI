function page(req, res) {
  const dataSource = [
    {id: '1', name: '任务名', group: '任务组', rule: '定时规则', className: 'com.wang.jmonkey.modules.sys.task.SysTestTask', usedState: 1},
    {id: '2', name: '任务名2', group: '任务组2', rule: '定时规则2', className: 'com.wang.jmonkey.modules.sys.task.SysTestTask', usedState: 0},
    {id: '3', name: '任务名3', group: '任务组3', rule: '定时规则3', className: 'com.wang.jmonkey.modules.sys.task.SysTestTask', usedState: 1},
    {id: '4', name: '任务名4', group: '任务组4', rule: '定时规则4', className: 'com.wang.jmonkey.modules.sys.task.SysTestTask', usedState: 0},
  ]

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize: 20,
    current: 1,
  };
  return res.json(result);
}

export default {
  'GET /api/sys/task/page': page
};
