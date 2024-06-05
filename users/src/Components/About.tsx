import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ColumnType } from "antd/es/table";

import {Button, Modal, Space, Table, Form, DatePicker, Input, Popconfirm, message, Select } from "antd";
import axios from "axios";

const { Option } = Select;

interface DataType {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  emailnd: string;
  phonenumber: string;
  address: string;
  gender: string;
  dateofbirth: Date;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Datatable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<any>([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (editFormData) {
      form.setFieldsValue({
        ...editFormData,
      });
    }
  }, [editFormData, form]);
  

  const fetchData = async () => {
    try {
      const response = await axios.get<DataType[]>(
        "http://localhost:8100/employee/"
      );
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Received data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
      message.error("Failed to fetch data");
    }
  };

  const handleEdit = (record: DataType) => {
    const formattedRecord = {
      ...record,
      dateofbirth: record.dateofbirth ? dayjs(record.dateofbirth) : null,
    };
    setEditFormData(formattedRecord);
    setEditModalVisible(true);
  };
  

  const handleEditSubmit = async (values: DataType) => {
    const updatedValues = {
      ...values,
      dateofbirth: values.dateofbirth ? dayjs(values.dateofbirth).format('YYYY-MM-DD') : '',
    };
    if (editFormData?.id) {
      try {
        await axios.patch(`http://localhost:8100/employee/patchBy/${editFormData.id}`, updatedValues);
        fetchData();
        message.success("Data edited successfully");
      } catch (error) {
        console.error("Failed to edit data", error);
        message.error("Failed to edit data");
      }
      setEditModalVisible(false);
      setEditFormData(null); 
    }
  };
  

  const handleDelete = async (record: DataType) => {
    try {
      await axios.delete(
        `http://localhost:8100/employee/removeBy/${record.id}`
      );
      fetchData();
      message.success("Data deleted successfully");
    } catch (error) {
      message.error("Failed to delete data");
    }
  };

  const columns: Array<ColumnType<DataType>> = [
    { title: "First Name", dataIndex: "firstname", key: "firstname"},
    { title: "Middle Name", dataIndex: "middlename", key: "middlename" },
    { title: "Last Name", dataIndex: "lastname", key: "lastname" },
    { title: "Email Id", dataIndex: "emailid", key: "emailid" },
    { title: "Phone Number", dataIndex: "phonenumber", key: "phonenumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    { 
      title: "Gender", 
      dataIndex: "gender", 
      key: "gender",
      filters:[
        {text:'Male', value:'male'},
        {text:'Female', value:'female'},
        {text:'Others', value:'others'}
      ],
      onFilter: (value, record: DataType) => record.gender.toLowerCase() === value
    },
    { title: "Date of Birth", key: "dataofbirth",
    render: (_: any, record: DataType) => dayjs(record.dateofbirth).format('YYYY-MM-DD'),
     },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this entry?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title="Edit Data"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleEditSubmit}
          initialValues={editFormData}
          {...formItemLayout}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Middle Name" name="middlename">
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Email Id"
            name="emailid"
            rules={[{ required: true, type: "email" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phonenumber"
            rules={[{ required: true, min: 10 }]}
          >
            <Input type="tel" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date Of Birth"
            name="dateofbirth"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Datatable;
