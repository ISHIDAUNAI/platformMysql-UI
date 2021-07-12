import React from 'react';
import ReactDOM from 'react-dom';

import ConfirmDelete from "./ConfirmDelete";
import ConfirmSure from "./ConfirmSure";

class Confirm{}

/**
 * 创建挂载dom
 * @param id
 * @returns {HTMLElement}
 */
const buildContainer = (id) => {
  let messageContainer = document.getElementById(id)
  if (!messageContainer) {
    messageContainer = document.createElement('div')
    messageContainer.id = id
    document.body.appendChild(messageContainer)
  }

  return messageContainer;
}

/**
 * 删除确认框
 * @param content 提示信息
 * @param confirm 回调函数
 */
Confirm.delete = function deleteHandle({content = '确认删除信息？', confirm = null}) {
  const reactElement = ReactDOM.createPortal(
    <ConfirmDelete content={content} confirm={confirm}/>,
    document.body,
    + new Date()
  )

  ReactDOM.render(reactElement, buildContainer('confirm-delete-container'))
}

/**
 * 确认信息框
 * @param content 提示信息
 * @param confirm 回调函数
 */
Confirm.sure = function sureHandle({content = '确认信息', confirm = null}) {
  const reactElement = ReactDOM.createPortal(
    <ConfirmSure content={content} confirm={confirm}/>,
    document.body,
    + new Date()
  )

  ReactDOM.render(reactElement, buildContainer('confirm-sure-container'))
}

export default Confirm;
