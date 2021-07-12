import { page, remove, pause, resume, checkUserName, save, update, updatePassword } from '@/services/sys/user';
import { message } from 'antd';
import moment from 'moment';

const Model = {
  namespace: 'SysUserModel',
  state: {
    modalVisible: false,
    modalPasswordVisible: false,
    list: [],
    user: {
      userName: '',
      password: '',
      realName: '',
      photo: '',
      birthday: moment(new Date()),
      sex: 'MAN',
      phone: '',
      usedState: 'YES',
      roleIdList: [],
      deptIdList: [],
    },
    searchForm: {
      pageSize: 20,
      total: 0,
      current: 1,
      userName: null,
      realName: null,
      phone: null,
      sex: undefined,
      usedState: undefined,
      roleId: null,
      deptId: null,
    },
    passwordForm: {
      id: null,
      realName: null,
      password: null,
      oldPassword: null,
      newPassword: null,
    }
  },
  effects: {
    *PageEffect({ payload }, { select, call, put }) {
      const response = yield call(page, payload);
      yield put({ type: 'listReducer', payload: Array.isArray(response.data) ? response.data : [], });

      // 总条数
      const { searchForm } = yield select((state) => state.SysUserModel);
      yield put({ type: 'searchFormReducer', payload: {...searchForm, ...{total: response.total}}});
    },
    *removeEffect({ payload }, {call}) {
      const response = yield call(remove, payload);

      if (response.result) message.success('删除用户成功!');
      else message.error('删除用户失败!');
    },
    *pauseEffect({ payload }, {call}) {
      const response = yield call(pause, payload);

      if (response.result) message.success('停用用户成功!');
      else message.error('停用用户失败!');
    },
    *resumeEffect({ payload }, {call}) {
      const response = yield call(resume, payload);

      if (response.result) message.success('启用用户成功!');
      else message.error('启用用户失败!');
    },
    *saveEffect({ payload }, { call }) {
      const response = yield call(save, payload);

      if (response.result) message.success('新建用户成功!');
      else message.error('新建用户失败!');
    },
    *updateEffect({ payload }, { call }) {
      const response = yield call(update, payload);

      if (response.result) message.success('修改用户成功!');
      else message.error('修改用户失败!');
    },
    *updatePasswordEffect({ payload }, { call }) {
      const response = yield call(updatePassword, payload);

      if (response.result) message.success('修改用户密码成功!');
      else message.error('修改用户密码失败!');
    },
    *checkUserNameEffect({ payload }, { call }) {
      const response = yield call(checkUserName, payload);
      return response.result
    }
  },
  reducers: {
    listReducer(state, action) {
      return { ...state, list: action.payload };
    },
    searchFormReducer(state, action) {
      return { ...state, searchForm: action.payload };
    },
    changeVisibleReducer(state, action) {
      return { ...state, modalVisible: action.payload };
    },
    changePasswordVisibleReducer(state, action) {
      return { ...state, modalPasswordVisible: action.payload };
    },
    passwordFormReducer(state, action) {
      return { ...state,  passwordForm: action.payload };
    },
    userReducer(state, {payload}) {
      if (payload) {
        const deptIdList = payload.deptList.map(dept => dept.id);
        const roleIdList = payload.roleList.map(role => role.id);

        return {
          ...state,
          user: {...payload, ...{deptIdList}, ...{roleIdList}, ...{birthday: moment(payload.birthday)}}
        };
      }
      return {
        ...state,
        user: {
          userName: '',
          password: '',
          realName: '',
          photo: '',
          birthday: moment(new Date()),
          sex: 'MAN',
          phone: '',
          usedState: 'YES',
          roleIdList: [],
          deptIdList: [],
        },
      };
    }
  }
}

export default Model;
