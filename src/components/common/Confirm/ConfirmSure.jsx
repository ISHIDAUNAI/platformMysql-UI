import React, {useState} from 'react';
import {Modal, Button} from 'antd';

import {
  ExclamationCircleTwoTone
} from '@ant-design/icons';
import styles from './index.less';

const ConfirmSure = (props) => {
  const {content, confirm} = props

  const [visible, handleVisible] = useState(true);
  const [loading, handleLoading] = useState(false);

  const handleCancel = () => {
    handleVisible(false)
  };

  const handleSure = async () => {
    await handleLoading(true)

    confirm()
    handleCancel()
  };

  return (
    <Modal
      className={styles.confirmSure}
      title=' '
      footer={[
        <Button key="back" onClick={handleSure} type="primary" block loading={loading}>
          确 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 定
        </Button>
      ]}
      centered
      width={400}
      destroyOnClose
      visible={visible}
      onCancel={handleCancel}
    >
      <ExclamationCircleTwoTone twoToneColor="#19be6b" style={{
        fontSize: '50px'
      }}/>
      <div className={styles.content} dangerouslySetInnerHTML={{__html: content}} />
    </Modal>
  );
}

export default ConfirmSure;
