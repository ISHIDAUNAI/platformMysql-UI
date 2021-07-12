import { save, update, tree, remove } from '@/services/sys/menu';
import { message } from 'antd';

const Model = {
  namespace: 'SysMenuModel',
  state: {
    list: [],
    modalVisible: false,
    menu: {
      name: '',
      icon: '',
      path: '',
      component: '',
      isIndex: 'NO',
      showType: 'HOME',
      sort: 1,
      parentId: '',
      remark: ''
    },
  },
  effects: {
    *listEffect({ payload }, { call, put }) {
      const response = yield call(tree, payload);
      yield put({ type: 'listReducer', payload: response.result});
    },
    *saveEffect({ payload }, { call }) {
      const response = yield call(save, payload);

      if (response.result) message.success('新建菜单成功!');
      else message.error('新建菜单失败!');
    },
    *updateEffect({ payload }, { call }) {
      const response = yield call(update, payload);

      if (response.result) message.success('修改菜单成功!');
      else message.error('修改菜单失败!');
    },
    *removeEffect({ payload }, {call}) {
      const response = yield call(remove, payload);

      if (response.result) message.success('删除菜单成功!');
      else message.error('删除菜单失败!');
    },
  },
  reducers: {
    modalVisibleReducer(state, {payload}) {
      return { ...state, modalVisible: payload };
    },
    listReducer(state, {payload}) {
      return { ...state, list: payload };
    },
    menuReducer(state, {payload}) {
      if (payload) {
        return { ...state, menu: {...payload, id: payload.menuId} };
      }

      return {
        ...state,
        menu: {
          name: '',
          icon: '',
          path: '',
          component: '',
          isIndex: 'NO',
          showType: 'HOME',
          sort: 1,
          parentId: '',
          remark: ''
        }
      }
    },
  }
}

export default Model;
