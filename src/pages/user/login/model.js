import { history } from 'umi';
import { message } from 'antd';
import { accountLogin, getFakeCaptcha } from '@/services/login';
import { loginResource } from '@/services/sys/resource';
import { setToken, setIsGuide, setSystem, setCurrentSystem, getRoleCodeList, setPermission } from '@/utils/token';
import { setAuthority } from '@/utils/authority';
import {convertToGroupList} from '@/pages/sys/system/util'

const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({ type: 'changeLoginStatus', payload: { status: response.isSuccess, type: payload.type }, });

      // 登录失败
      if (!response.isSuccess) return ;

      setToken(response.result);

      // 处理用户展示的系统信息
      const resourceRes = yield call(loginResource);
      // 保存权限标志
      setPermission(resourceRes.result.authCode);

      // 处理系统配置内容
      const systemList = resourceRes.result.systemList;

      // 处理是否展示引导页
      let isGuide = 'NO';
      for(let index in systemList) {
        const system = systemList[index]

        if (system.isGuide === 'YES') {
          isGuide = 'YES';
          break ;
        }
      }

      // 设置是否需要进入引导页配置
      setIsGuide(isGuide);
      // 设置有权限查看系统list信息
      setSystem(convertToGroupList(systemList));

      // 如果不需要引导页，默认进入第一个系统
      const s = systemList[0];
      const authList = [];
      getRoleCodeList().forEach(code => authList.push(s.resourceId + '_' + code) )
      setAuthority(authList);
      setCurrentSystem(s);

      // 进入下一页面
      history.replace(isGuide === 'NO' ? '/' : '/guide');
      message.success('登录成功！');
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
