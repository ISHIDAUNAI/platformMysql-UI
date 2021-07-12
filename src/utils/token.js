/**
 * 设置token信息
 * @param tokenInfo tokenInfo
 */
export function setToken(tokenInfo) {
  localStorage.setItem('zhHealth_Token', JSON.stringify(tokenInfo));
}

/**
 * 清除token信息
 */
export function removeToken() {
  localStorage.removeItem('zhHealth_Token');
}

/**
 * 获取token信息
 * @returns {string}
 */
export function getToken() {
  return localStorage.getItem('zhHealth_Token');
}

/**
 * 获取 accessToken
 * @returns {string}
 */
export function getAccessToken() {
  return localStorage.getItem('zhHealth_Token')
    ? JSON.parse(localStorage.getItem('zhHealth_Token')).accessToken
    : '';
}

/**
 * 获取当前登录人角色列表
 * @returns {*}
 */
export function getRoleCodeList() {
  return localStorage.getItem('zhHealth_Token')
    ? JSON.parse(localStorage.getItem('zhHealth_Token')).roleCodeList
    : [];
}

/**
 * 获取当前登录人第一个角色
 * @returns {*}
 */
export function getFirstRoleCode() {
  return localStorage.getItem('zhHealth_Token')
    ? JSON.parse(localStorage.getItem('zhHealth_Token')).roleCodeList[0]
    : '';
}

/**
 * 获取当前登录人信息
 * @returns {*}
 */
export function getUser() {
  return localStorage.getItem('zhHealth_Token')
    ? JSON.parse(localStorage.getItem('zhHealth_Token')).user
    : {};
}

/**
 * 设置是否需要引导页配置
 * @returns {string}
 */
export function setIsGuide(isGuide) {
  localStorage.setItem('zhHealth_Guide', isGuide);
}

/**
 * 获取是否需要引导页配置
 * @returns {string}
 */
export function getIsGuide() {
  return localStorage.getItem('zhHealth_Guide');
}

/**
 * 设置当前登录人所有的系统信息
 * @returns {any}
 */
export function setSystem(systemList) {
  localStorage.setItem('zhHealth_System', JSON.stringify(systemList));
}

/**
 * 获取当前登录人所有的系统信息
 * @returns {any}
 */
export function getSystem() {
  return localStorage.getItem('zhHealth_System')
    ? JSON.parse(localStorage.getItem('zhHealth_System'))
    : [];
}

/**
 * 设置权限标志
 * @returns {any}
 */
export function setPermission(permissionList) {
  localStorage.setItem('zhHealth_Permission', JSON.stringify(permissionList));
}

/**
 * 获取权限标志
 * @returns {any}
 */
export function getPermission() {
  return localStorage.getItem('zhHealth_Permission')
    ? JSON.parse(localStorage.getItem('zhHealth_Permission'))
    : [];
}

/**
 * 是否存在某个权限标志
 * @param permission
 * @returns {boolean}
 */
export function havePermission(permission) {
  return getPermission().indexOf(permission) >= 0
}
window.havePermission = havePermission

/**
 * 设置当前使用的系统信息
 * @param system
 */
export function setCurrentSystem(system) {
  localStorage.setItem('zhHealth_Current_System', JSON.stringify(system));
}

/**
 * 获取当前使用的系统信息
 * @returns {any}
 */
export function getCurrentSystem() {
  return localStorage.getItem('zhHealth_Current_System')
    ? JSON.parse(localStorage.getItem('zhHealth_Current_System'))
    : null;
}
