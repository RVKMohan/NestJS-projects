import { useState } from 'react';
import { Button, Table, Modal, Input, Form } from 'antd';
import axios from "axios";


let count = 0;

const Todo = () => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const [form] = Form.useForm();

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const showModal3 = () => {
    setIsModalOpen3(true);
  };

 
   
  const updateClick = () => {
    count = count + 1;
    if (count > 1){
      showModal3();
    }
    else{
      showModal2();
    }
    
  }

  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
  };

  const columns = [
    {
      title: 'S.no',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date To Complete',
      dataIndex: 'datetocomplete',
      key: 'datetocomplete',
    },
    {
      title: 'Start Date',
      dataIndex: 'startdate',
      key: 'startdate',
    },
    {
      title: 'Start Time',
      dataIndex: 'starttime',
      key: 'starttime',
    },
    {
      title: 'Completed Date',
      dataIndex: 'completeddate',
      key: 'completeddate',
    },
    {
      title: 'Completed Time',
      dataIndex: 'completedtime',
      key: 'completedtime',
    },
    {
      title: 'Action',
      key: "action",
      render: (text: any, record: any) => (
        <div>
          <Button >Update</Button>
        </div>
      ),
    }
  ]

   const onFinish = async (values: any) => {
    await axios.post("http://localhost:8100/todo/", values);
    console.log(values)
   form.resetFields();
   setIsModalOpen1(false);
   };

  

  return (
    <div>
      <br />
      <h1 style={{fontWeight:'bold', color:'grey'}}>Todo Application</h1>
      <br /><br /><Button type='primary' onClick={showModal1}>Create a Todo</Button> <br /><br />

      <Table columns={columns}></Table>

      <Modal title="Create Your Todo" open={isModalOpen1} onCancel={handleCancel} footer={null} >
        <Form form={form} onFinish={onFinish} >
          <p>Activity:</p><Input name="activity" placeholder='Enter Your Activity' /><br /><br />
          <p>Date To Complete:</p><Input name="datetocomplete" placeholder='Enter Your Date To Complete' /><br /><br />
          <Button type='primary' htmlType='submit'>Submit</Button>
        </Form>
      </Modal>

      <br></br>

      <Button type='primary' onClick={updateClick }>Update</Button>


      {/* <Button type='primary' onClick={showModal2}>Update1</Button> */}
      <Modal open={isModalOpen2} onCancel={handleCancel} footer={null} >
        <Form>
          <p>Current Status:</p><Input name='status' placeholder='Enter Your Current Status' defaultValue="InProgress" /><br /><br />
          <p>Activity Start Date:</p><Input name='startdate' placeholder='Enter Your Activity Start Date' /><br /><br />
          <p>Activity Start Time:</p><Input name='starttime' placeholder='Enter Your Activity Start Time' /><br /><br />
          <Button type='primary'>Update My Status</Button>
        </Form>
      </Modal>

      <br></br>
      
      <br></br>
      {/* <Button type='primary' onClick={showModal3}>Update2</Button> */}
      <Modal open={isModalOpen3} onCancel={handleCancel} footer={null} >
        <Form>
          <p>Current Status:</p><Input name='status' placeholder='Enter Your Current Status' defaultValue="Completed" /><br /><br />
          <p>Activity Completed Date:</p><Input name='completeddate' placeholder='Enter Your Activity Completed Date' /><br /><br />
          <p>Activity Completed Time:</p><Input name='completedtime' placeholder='Enter Your Activity Completed Time' /><br /><br />
          <Button type='primary'>Update My Status</Button>
        </Form>
      </Modal>


    </div>

  )
}

export default Todo;