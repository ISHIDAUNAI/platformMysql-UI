import React from 'react';
import { connect } from 'umi';
import {Card, Button, Row, Col, Form, Input, Select} from 'antd';
import {SelectRole} from '@/components/sys/Role'
import {TreeSelectDept} from '@/components/sys/Dept'

const { Option } = Select;
const FormItem = Form.Item;

const SysUserSearch = (props) => {
  const {
    SysUserModel: { searchForm },
    dispatch,
  } = props;

  const [form] = Form.useForm();

  const handelSearch = () => {
    dispatch({ type: 'SysUserModel/PageEffect', payload: {...searchForm, ...form.getFieldsValue()}});
  }

  const handelReset = () => {
    form.resetFields()

    dispatch({ type: 'SysUserModel/PageEffect', payload: searchForm});
  }

  return (
    <Card
      bordered={false}
      className='search-card'
      style={{
        marginTop: 24,
      }}
    >
      <Form
        initialValues={searchForm}
        form={form}>
        <Row>
          <Col span={6}>
            <FormItem label="用户名称" name="userName" >
              <Input maxLength={10} placeholder="请输入"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="真实姓名" name="realName" >
              <Input maxLength={10} placeholder="请输入"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机号码" name="phone" >
              <Input maxLength={10} placeholder="请输入"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="用户性别" name="sex" >
              <Select placeholder="请选择">
                <Option key='MAN'> 男 </Option>
                <Option key='WOMAN'> 女 </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="启用状态" name="usedState" >
              <Select placeholder="请选择">
                <Option key='YES'> 启用 </Option>
                <Option key='NO'> 停用 </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="用户角色" name="roleId" >
              <SelectRole placeholder="请选择" />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="归属部门" name="deptId" >
              <TreeSelectDept placeholder="请选择" />
            </FormItem>
          </Col>

          <Col span={6} >
            <FormItem>
              <Button onClick={handelReset}> 重 置 </Button>
              <Button type="primary" onClick={handelSearch}> 查 询 </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default connect(({ SysUserModel }) => ({
  SysUserModel,
}))(SysUserSearch);
