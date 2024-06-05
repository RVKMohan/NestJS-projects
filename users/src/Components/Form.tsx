import React, { useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, Table, TableColumnsType, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
// import { BranchTransferSharedService } from '@shahi-packing/libs/shared-services';
import { useNavigate } from 'react-router-dom';
// import AlertMessages from 'packages/libs/backend-utils/src/lib/alert-messages/alert-messages';
import moment from 'moment';
import { log } from 'console';



type Record = {
  engine_number: number;
  chassis_number: number;
  sku_code: number;
  varient_id: number;
  model_name: string;
  vehicle_cost: number;
  std_accessories: number;
}

const AddBranchTransferForm: React.FC = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [subForm, setSubForm] = useState<any[]>([]);
  // const [toBranchEnable, setToBranchEnable] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [formData, setformData] = useState<any>({});
  const [enableTransportMedia, setEnableTransportMedia] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);

//   const service = new BranchTransferSharedService();
  const navigate = useNavigate();

  const onSubmit = () => {
    form1
      .validateFields()
      .then((values) => {
        setTableData([...tableData, values]);
        form1.resetFields();
      });
     
  }


//   const onSubmit = (values: any) => {
//     // const reqFields = ['engine_number', 'chassis_number', 'sku_code', 'varient_code', 'model_name', 'vehicle_cost', 'std_accessories']
//     // // const isValid = reqFields.every(field => formData[field]);

//     // if (!isValid) {
//     //   message.error("Please fill all fields");
//     //   return;
//     // }
//     setTableData([...tableData, values]);
//     console.log(tableData);
//     form.resetFields();
//   }


  // const onSubmit = () => {
  //   console.log(tableData)
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       setTableData((prevData) => [...prevData, values]);
  //       form.resetFields();
  //     })
  //     .catch((errorInfo) => {
  //       message.error('Please fill all fields');
  //     });
  // };

  const handleAddSubForm = () => {
    setSubForm([...subForm, {}]);
  };

  const handleRemoveSubForm = (index: number) => {
    const updatedSubForms = [...subForm];
    updatedSubForms.splice(index, 1);
    setSubForm(updatedSubForms);
  };

  const handleTransportMedia = (val: string) => {
    setEnableTransportMedia(val === 'Truck');
  };

  const handleSubFormChange = (index: number, values: any) => {
    const updatedSubForms = [...subForm];
    updatedSubForms[index] = values;
    setSubForm(updatedSubForms);
  };

//   const onFinish = (values: any) => {
//     try {
//       const transferDate = moment(values.branch_transfer_date).format(
//         'YYYY-MM-DD HH:mm:ss'
//       );
//       const combinedFormValues = { ...values, transferDate, subForm };

//       service.addBranchRecord(combinedFormValues).then((res) => {
//         if (res.status) {
//           AlertMessages.getSuccessMessage(res.internalMessage);
//           form.resetFields();
//           setSubForm([]);
//         } else {
//           AlertMessages.getErrorMessage(res.internalMessage);
//         }
//       });
//     } catch (error: any) {
//       AlertMessages.getErrorMessage(error.message);
//     }
//   };

  const onReset = () => {
    form.resetFields();
    setSubForm([]);
  };

  const columnsdata: TableColumnsType<any> = [
    {
      title: 'S.No',
      key: 'sno',
      align: 'center',
      render: (text, object, index) => (page - 1) * pageSize + (index + 1),
    },
    {
      title: 'Engine Number',
      dataIndex: 'engine_number',
      key: 'engine_number',
    },
    {
      title: 'Chassis Number',
      dataIndex: 'chassis_number',
      key: 'chassis_number',
    },
    {
      title: 'Sku Code',
      dataIndex: 'sku_code',
      key: 'sku_code',
    },
    {
      title: 'Varient Code',
      dataIndex: 'varient_id',
      key: 'varient_id',
      align: 'center',
    },
    {
      title: 'Vehicle Name',
      dataIndex: 'model_name',
      key: 'model_name',
    },
    {
      title: 'Vehicle Cost',
      dataIndex: 'vehicle_cost',
      key: 'vehicle_cost',
      align: 'center',
    },
    {
      title: 'STD Accessories',
      dataIndex: 'std_accessories',
      key: 'std_accessories',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',

      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
          // onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="Branch Transfer"
        extra={
          <Button
            style={{
              color: 'black',
              border: '1px solid #000000',
              backgroundColor: 'white',
            }}
            onClick={() => navigate('/inventory/viewBranchTransfer')}
          >
            View
          </Button>
        }
      >
        <Form layout="vertical" form={form} >
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                label="Date"
                name="date_time"
                rules={[{ required: true, message: 'Please enter Date!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="dc_number"
                label="Dc Number"
                rules={[{ required: true, message: 'Please enter DC Number!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="total_value"
                label="Total Value"
                rules={[
                  { required: true, message: 'Please enter Total Value!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Transport Number"
                name="transport_number"
                rules={[{ required: true, message: 'please enter Transport Number' }]}
                style={{ display: enableTransportMedia ? 'block' : 'none' }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Transfer Date"
                name="branch_transfer_date"
                rules={[{ required: true, message: 'Please enter Date!' }]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name="mr_number"
                label="MR Number"
                rules={[{ required: true, message: 'Please enter MR Number' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tax Amount"
                name="tax_amount"
                rules={[{ required: true, message: 'Please enter Tax Amount' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="from_branch_id"
                label="From Branch Id"
                rules={[{ required: true, message: 'Please enter From Branch Id' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Transfer Status"
                name="transfer_status"
                rules={[{ required: true, message: 'Please enter Transfer Status' }]}
              >
                <Select onChange={handleTransportMedia}>
                  <Select.Option value="Intransit">Intransit</Select.Option>
                  <Select.Option value="Received">Received</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="created_by" label="Created By">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              {/* {toBranchEnable && ( */}
              <Form.Item
                name="to_branch_id"
                label="To Branch Id"
                rules={[{ required: true, message: 'Please enter Branch Id' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="transport_by"
                label="Transport By"
                rules={[{ required: true, message: 'Please enter Transport By' }]}
              >
                <Select onChange={handleTransportMedia}>
                  <Select.Option value="Road">ByRoad</Select.Option>
                  <Select.Option value="Truck">ByTruck</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Truck Number"
                name="truck_number"
                rules={[{ required: true, message: 'Please enter Truck Number' }]}
                style={{ display: enableTransportMedia ? 'block' : 'none' }}
              >
                <Input />
              </Form.Item><br></br><br></br><br></br>


            </Col>
          </Row>

          <Card title="Branch Transfers Vehicle ID"
            style={{ marginBottom: 20, marginTop: 20, maxWidth: 4000, }}

          >
            <Form
              layout="inline"
              form={form1}
              // initialValues={subFormValues}
              onValuesChange={handleSubFormChange}
            >
              <Row gutter={24} style={{ width: '200%' }}>
                <Col span={6}>
                  <Form.Item name="engine_number" label="Engine Number">
                    <Input />
                  </Form.Item>
                  <Form.Item name="chassis_number" label="Chassis Number">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="sku_code" label="SKU Code">
                    <Input />
                  </Form.Item>
                  <Form.Item name="varient_id" label="Varient Code">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="model_name" label="Vehicle Name">
                    <Input />
                  </Form.Item>
                  <Form.Item name="vehicle_cost" label="Vehicle Cost">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="STD Accessories" name="std_accessories">
                    <Input />
                  </Form.Item>
                </Col>
              </Row><br /><br />
              <Form.Item>
              <Button type="primary" style={{ marginLeft: '1200px' }} onClick={onSubmit}>
                Add
              </Button>
              </Form.Item>

            </Form>
            <Table
              columns={columnsdata}
              dataSource={tableData}
            />
          </Card>

          <Row justify="end">
            <Col span={4}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;
              {/* <Button type="default" danger onClick={onReset}>
                Reset
              </Button> */}
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

// interface SubFormProps {
//   index: number;
//   subFormValues: any;
//   onChange: (values: any) => void;
//   onRemove: (index: number) => void;
// }

// const SubForm: React.FC<SubFormProps> = ({
//   index,
//   subFormValues,
//   onChange,
//   onRemove,
// }) => {
//   const [form] = Form.useForm();

//   const handleDelete = () => {
//     onRemove(index);
//   };

//   const handleSubFormChange = (changedValues: any) => {
//     const newDate = form.getFieldValue('date');
//     const date = moment(newDate).format('YYYY-MM-DD');
//     const updatedSubFormValues = { ...subFormValues, ...changedValues, date };
//     onChange(updatedSubFormValues);
//   };

//   return (
//     <Card title="Branch Transfers Vehicle ID" style={{ marginBottom: 20 }}>
//       <Form
//         layout="vertical"
//         form={form}
//         initialValues={subFormValues}
//         onValuesChange={handleSubFormChange}
//       >
//         <Row gutter={24}>
//           <Col span={6}>
//             <Form.Item name="engine_number" label="Engine Number">
//               <Input />
//             </Form.Item>
//             <Form.Item name="chassis_number" label="Chassis Number">
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={5}>
//             <Form.Item name="sku_code" label="SKU Code">
//               <Input />
//             </Form.Item>
//             <Form.Item name="varient_code" label="Varient Code">
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={5}>
//             <Form.Item name="model_name" label="Vehicle Name">
//               <Input />
//             </Form.Item>
//             <Form.Item name="vehicle_cost" label="Vehicle Cost">
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={5}>
//             <Form.Item label="STD Accessories" name="tax_cost">
//               <Input />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row justify="end">
//           <Col span={4}>
//             <Button
//               type="primary"
//               onClick={handleDelete}
//               icon={<MinusCircleOutlined />}
//             >
//               Remove
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </Card>
//   );
// };

export default AddBranchTransferForm;