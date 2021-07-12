import { user, roleUser, deptUser } from '@/services/sys/count';
import { login } from '@/services/log/count';
import numeral from 'numeral';

const Model = {
  namespace: 'SysHomeModel',
  state: {
    user: {total: 0, yesState: 0, noState: 0, today: 0},
    role:[],
    login: {total: 0, today: 0, success: 0, error: 0, ratio: 100, list: []},
    dept: [],
  },
  effects: {
    *userEffect(_, { call, put }) {
      const response = yield call(user);
      yield put({ type: 'userReducer', payload: response.result});
    },
    *roleEffect(_, { call, put }) {
      const response = yield call(roleUser);
      yield put({ type: 'roleReducer', payload: response.result});
    },
    *loginEffect(_, { call, put }) {
      const response = yield call(login);
      yield put({ type: 'loginReducer', payload: response.result});
    },
    *deptEffect(_, { call, put }) {
      const response = yield call(deptUser);
      yield put({ type: 'deptReducer', payload: response.result});
    },
  },
  reducers: {
    userReducer(state, {payload}) {
      return { ...state, user: payload };
    },
    roleReducer(state, {payload}) {
      return { ...state, role: payload };
    },
    loginReducer(state, {payload}) {
      const ratio = numeral((payload.success / payload.total) * 100).format('0,0')
      return { ...state, login: {...payload, ...{ratio}} };
    },
    deptReducer(state, {payload}) {
      for (let i = 0; i < payload.length; i++) {
        payload[i].deptIndex = i + 1
      }

      return { ...state, dept: payload };
    },
  }
}

export default Model;
