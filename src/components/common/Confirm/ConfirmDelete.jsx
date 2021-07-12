import React, {useState} from 'react';
import {Modal, Button} from 'antd';

import {
  DeleteOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const ConfirmDelete = (props) => {
  const {content, confirm} = props

  const [visible, handleVisible] = useState(true);
  const [loading, handleLoading] = useState(false);

  const handleCancel = () => {
    handleVisible(false)
  };

  const handleDelete = async () => {
    await handleLoading(true)

    confirm()
    handleCancel()
  };

  return (
    <Modal
      className={styles.confirmDelete}
      title={
        (
          <div>
            <DeleteOutlined />
            <span> 删除确认 </span>
          </div>
        )
      }
      footer={[
        <Button key="submit" onClick={handleDelete} type="primary" danger block loading={loading}>
          删 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 除
        </Button>
      ]}
      centered
      width={400}
      destroyOnClose
      visible={visible}
      onOk={handleDelete}
      onCancel={handleCancel}
    >
      <div dangerouslySetInnerHTML={{__html: content}} />
    </Modal>
  );
}

export default ConfirmDelete;
