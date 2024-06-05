import { Button, Form, Input, Table } from "antd";
import { useState, useContext } from "react";
import { store } from "./Form1";

interface Form2Values {
  data: any;
}

const Form2 = ({ data }: Form2Values) => {
  const { tableData, setTableData } = useContext(store);

  const [form] = Form.useForm<Form2Values>();

  const onFinishForm2 = (values: Form2Values) => {
    setTableData([...tableData, values]);
    data(values);
    form.resetFields();
  };

  const columns = [
    { title: "Item", dataIndex: "item", key: "item" },
    { title: "Item Price", dataIndex: "itemprice", key: "itemprice" },
  ];

  return (
    <div>
      <Form layout="inline" form={form} onFinish={onFinishForm2}>
        <Form.Item label="Item" name="item">
          <Input placeholder="Modal Item" />
        </Form.Item>
        <Form.Item label="Item Price" name="itemprice">
          <Input placeholder="Item Price" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
      <br />
      <Table dataSource={tableData} columns={columns} rowKey="id" />
    </div>
  );
};

export default Form2;
