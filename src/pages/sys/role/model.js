import { list, save, update, remove, checkCode } from '@/services/sys/role';
import { auth } from '@/services/sys/role/resource';
import { message } from 'antd';

const Model = {
  namespace: 'SysRoleModel',
  state: {
    list: [],
    modalVisible: false,
    authorizeVisible: false,
    role: {
      id: null,
      name: '',
      code: '',
      remark: '',
    },
  },
  effects: {
    *listEffect(_, { call, put }) {
      const response = yield call(list);

      const listData = Array.isArray(response.result) ? response.result : [];
      yield put({ type: 'ListReducer', payload: listData });
    },
    *saveEffect({ payload }, { call }) {
      const response = yield call(save, payload);

      if (response.result) message.success('新建角色成功!');
      else message.error('新建角色失败!');
    },
    *updateEffect({ payload }, { call }) {
      const response = yield call(update, payload);

      if (response.result) message.success('修改角色成功!');
      else message.error('修改角色失败!');
    },
    *removeEffect({ payload }, { call }) {
      const response = yield call(remove, payload);

      if (response.result) message.success('删除角色成功!');
      else message.error('删除角色失败，请查看角色信息是否被使用!');
    },
    *checkCodeEffect({ payload }, { call }) {
      const response = yield call(checkCode, payload);
      return response.result
    },
    *authEffect({ payload }, { call }) {
      const response = yield call(auth, payload);

      if (response.result) message.success('角色授权成功!');
      else message.error('角色授权失败!');
    },
  },
  reducers: {
    ListReducer(state, action) {
      return { ...state, list: action.payload };
    },
    changeVisibleReducer(state, { payload }) {
      return { ...state, modalVisible: payload };
    },
    changeAuthorizeVisible(state, { payload }) {
      return { ...state, authorizeVisible: payload };
    },
    roleReducer(state, { payload }) {
      if (payload) {
        return { ...state, role: payload };
      }
      return {
        ...state,
        role: {
          id: null,
          name: '',
          code: '',
          remark: '',
        },
      };
    },
  },
};

export default Model;
