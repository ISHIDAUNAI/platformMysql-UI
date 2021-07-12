import { save, update, listAll, remove } from '@/services/sys/system';
import { message } from 'antd';
import {convertToGroupList} from './util'

const Model = {
  namespace: 'SysSystemModel',
  state: {
    modalVisible: false,
    system: {
      type: '',
      name: '',
      describe: '',
      icon: '',
      isGuide: 'YES',
      showType: 'SELF',
      blankPath: '',
      sort: 1
    },
    list:[]
  },
  effects: {
    *listEffect(_, { call, put }) {
      const response = yield call(listAll);
      yield put({ type: 'listReducer', payload: response.result});
    },
    *saveEffect({ payload }, { call }) {
      const response = yield call(save, payload);

      if (response.result) message.success('新建系统成功!');
      else message.error('新建系统失败!');
    },
    *updateEffect({ payload }, { call }) {
      const response = yield call(update, payload);

      if (response.result) message.success('修改系统成功!');
      else message.error('修改系统失败!');
    },
    *removeEffect({ payload }, {call}) {
      const response = yield call(remove, payload);

      if (response.result) message.success('删除系统成功!');
      else message.error('删除系统失败!');
    },
  },
  reducers: {
    modalVisibleReducer(state, {payload}) {
      return { ...state, modalVisible: payload };
    },
    systemReducer(state, {payload}) {
      if (payload) {
        return { ...state, system: payload };
      }

      return {
        ...state,
        system: {
          type: '',
          name: '',
          describe: '',
          icon: '',
          isGuide: 'YES',
          showType: 'SELF',
          blankPath: '',
          sort: 1
        }
      }
    },
    listReducer(state, {payload}) {
      return { ...state, list: convertToGroupList(payload) };
    },
  }
}

export default Model;
