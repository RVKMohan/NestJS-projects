import axios from "axios";

import { Button, DatePicker, Form, Input, Select } from "antd";

const { Option } = Select;

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

const Formpage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    await axios.post("http://localhost:8100/employee/", values);
    form.resetFields();
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        variant="filled"
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
          <Input.TextArea style={{ width: "100%" }} />
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
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Formpage;
