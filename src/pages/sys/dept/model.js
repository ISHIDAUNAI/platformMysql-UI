import { list, remove, save, update, checkCode } from '@/services/sys/dept';
import { buildTreeData } from '@/utils/common';
import { message } from 'antd';

const Model = {
  namespace: 'SysDeptModel',
  state: {
    modalVisible: false,
    treeData: [],
    treeSelectData: [],
    selectDept: null,
    dept: {
      id: null,
      parentId: '',
      name: '',
      nameSimple: '',
      namePy: '',
      nameWb: '',
      type: 'J01',
      grade: 1,
      code: '',
      sort: 1,
      relationName: '',
      relationPhone1: '',
      relationPhone2: '',
      relationMobile: '',
      relationAddress: '',
      remark: '',
    },
    deptType: {
      J01: '省级机构',
      J02: '市级机构',
      J03: '区级机构',
      J04: '社区机构',
      Y11: '省直医院',
      Y12: '市直医院',
      Y13: '民营委管',
      Y14: '区直医院',
      Y15: '社区医院',
    }
  },
  effects: {
    *listEffect(_, { call, put }) {
      const response = yield call(list);

      const listData = Array.isArray(response.result) ? response.result : [];
      yield put({ type: 'SelectTreeReducer', payload: buildTreeData(listData, {keyLabel:'value'}) });

      const treeNodeList = buildTreeData(listData);
      yield put({ type: 'ListTreeReducer', payload: treeNodeList });

      if (treeNodeList.length > 0) {
        yield put({ type: 'selectDeptReducer', payload: treeNodeList[0] });
      }
    },
    *removeEffect(_, { select, call }) {
      const { selectDept } = yield select((state) => state.SysDeptModel);

      if (selectDept && selectDept.children.length > 0) {
        message.error('请先删除下级部门信息!');
        return;
      }

      const response = yield call(remove, selectDept.id);

      if (response.result) message.success('删除部门成功!');
      else message.error('部门信息被使用，禁止删除!');
    },
    *saveEffect({ payload }, { call }) {
      const response = yield call(save, payload);

      if (response.result) message.success('新建部门成功!');
      else message.error('新建部门失败!');
    },
    *updateEffect({ payload }, { call }) {
      const response = yield call(update, payload);

      if (response.result) message.success('修改部门成功!');
      else message.error('修改部门失败!');
    },
    *checkCodeEffect({ payload }, { call }) {
      const response = yield call(checkCode, payload);
      return response.result
    }
  },
  reducers: {
    ListTreeReducer(state, { payload }) {
      return { ...state, treeData: payload };
    },
    SelectTreeReducer(state, { payload }) {
      const nodeList = [{value: '', title: '顶层机构部门', children: payload}]
      return { ...state, treeSelectData: nodeList };
    },
    selectDeptReducer(state, { payload }) {
      return { ...state, selectDept: payload };
    },
    changeVisibleReducer(state, { payload }) {
      return { ...state, modalVisible: payload };
    },
    deptReducer(state, { payload }) {
      if (payload) {
        return { ...state, dept: {...payload, ...{parentId: payload.parentId ? payload.parentId : ''}} };
      }
      return {
        ...state,
        dept: {
          id: null,
          parentId: '',
          name: '',
          nameSimple: '',
          namePy: '',
          nameWb: '',
          type: 'J01',
          grade: 1,
          code: '',
          sort: 1,
          relationName: '',
          relationPhone1: '',
          relationPhone2: '',
          relationMobile: '',
          relationAddress: '',
          remark: '',
        },
      };
    },
  },
};

export default Model;
