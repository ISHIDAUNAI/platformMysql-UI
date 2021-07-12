import { save, update, listByParentId, remove } from '@/services/sys/button';
import { message } from 'antd';

const Model = {
  namespace: 'SysButtonModel',
  state: {
    list: [],
    modalVisible: false,
    button: {
      name: '',
      permission: '',
      url: '',
      method: 'GET',
      remark: '',
      parentId: '',
    }
  },
  effects: {
    *listEffect({ payload }, { call, put }) {
      const response = yield call(listByParentId, payload);
      yield put({ type: 'listReducer', payload: response.result});
    },
    *saveEffect({ payload }, { call }) {
      const response = yield call(save, payload);

      if (response.result) message.success('新建按钮成功!');
      else message.error('新建按钮失败!');
    },
    *updateEffect({ payload }, { call }) {
      const response = yield call(update, payload);

      if (response.result) message.success('修改按钮成功!');
      else message.error('修改按钮失败!');
    },
    *removeEffect({ payload }, {call}) {
      const response = yield call(remove, payload);

      if (response.result) message.success('删除按钮成功!');
      else message.error('删除按钮失败!');
    },
  },
  reducers: {
    listReducer(state, {payload}) {
      return { ...state, list: payload };
    },
    modalVisibleReducer(state, {payload}) {
      return { ...state, modalVisible: payload };
    },
    buttonReducer(state, {payload}) {
      if (payload) {
        return { ...state, button: payload };
      }

      return {
        ...state,
        button: {
          name: '',
          permission: '',
          url: '',
          method: 'GET',
          remark: '',
          parentId: '',
        }
      }
    }
  }
}

export default Model;
