import React from 'react'
import { Col, DatePicker, Form, Input, Row } from "antd";
import "./App.css";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Dummy = () => {
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


  return (
     <div className="App">
      <header className="App-header">
        <Form layout="horizontal"  {...formItemLayout}>
          <Form.Item
            label="Vehicle"
            name="vehicle"
            rules={[{ required: true, message: "Please Select!" }]}
            style={{ marginBottom: "16px" }}
          >
            <Select
             
             style={{ width: "100%" , marginLeft:"3cm"}}
              showSearch
              placeholder="Select a Vehicle"
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </Form.Item>
         

          <Form.Item
            label="Assignee"
            name="assignee"
            rules={[{ required: true, message: "Please Select!" }]}
            style={{ marginBottom: "16px" }}
          >
            <Select
             style={{marginLeft:"3cm"}}
              showSearch
              placeholder="Select a Assignee"
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </Form.Item>

          <Form.Item  rules={[{ required: true, message: "Please Select!" }]}
            style={{ marginBottom: "16px" }} label="Title" name="title">
            <Input style={{ width: "100%", marginLeft:"3cm" }}/>
          </Form.Item>

          <Form.Item  
            style={{ marginBottom: "16px" }} label="Description" name="description">
          <TextArea style={{ width: "100%", marginLeft:"3cm" }} />
        </Form.Item>

        <Form.Item 
            style={{ marginBottom: "16px" }} label="File Upload" name="fileUpload" >
        <Input style={{ width: "100%", marginLeft:"3cm" }}/>
      </Form.Item>

      <Form.Item
            label="Priority"
            name="Priority"
            rules={[{ required: true, message: "Please Select!" }]}
            style={{ marginBottom: "16px" }}
          >
            <Select
              style={{ width: "100%", marginLeft:"3cm" }}
              showSearch
              placeholder="Select a Priority"
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={[
                {
                  value: "high",
                  label: "High",
                },
                {
                  value: "low",
                  label: "Low",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Due Date" name="dueDate">
            <DatePicker style={{ width: "100%",  marginLeft:"3cm" }}/>
          </Form.Item>

      

        </Form>
        </header>
    </div>
  )
};

export default Dummy