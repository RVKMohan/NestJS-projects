import { useState, createContext } from "react";
import { Button, Form, Input, Table } from "antd";
import Form2 from "./Form2";
import { Dto } from "./dto";
import axios from "axios";

export const store = createContext<UserContextType>({
  tableData: [],
  setTableData: () => {},
  resetTableData: () => {},
});

interface UserContextType {
  tableData: any[];
  setTableData: (data: any[]) => void;
  resetTableData: () => void;
}

interface Form1Values {
  category: string;
  modal: string;
}

interface Form2Values {
  item: string;
  itemprice: string;
}

const Form1 = () => {
  const [form] = Form.useForm<Form1Values>();
  const [form2Data, setForm2Data] = useState<Form2Values[]>([]);
  // const [totalData, setTotalData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<Form2Values[]>([]);
  const [table2, setTable2] = useState([])

  const resetTableData = () => {
    setTableData([]);
  };

  const contextValue = { tableData, setTableData, resetTableData };

  const onFinishForm1 = async (values: Form1Values) => {
    const req = new Dto(values.category, values.modal, form2Data);
     await axios.post("http://localhost:8100/products/", req);
    console.log(req);
    setForm2Data([]);
    form.resetFields();
    resetTableData();
  };
  
  const handleDataFromForm2 = (newData: any) => {
    setForm2Data((prevData) => [...prevData, newData]);
  };

  // const fetch = async () => {
  //   try{
  //     const response = await axios.get<any[]>("http://localhost:8100/product/");
  //   }
  // }

  const column1 =[ 
    {
    title:"Item",
    dataIndex:"item",
    key:"item"
    },
    {
    title:"Item Price",
    dataIndex:"itemprice",
    key:"itemprice"
    }]

  return (
    <div>
      <br></br>
      <Form layout="inline" form={form} onFinish={onFinishForm1}>
        <Form.Item label="Category" name="category">
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item label="Modal" name="modal">
          <Input placeholder="Modal" />
        </Form.Item>
      </Form>
      <br></br>
      <store.Provider value={{ tableData, setTableData, resetTableData }}>
        <Form2 data={handleDataFromForm2} />
      </store.Provider>

      <Button
        htmlType="submit"
        onClick={() => form.submit()}
        style={{ alignSelf: "center", marginTop: "20px" }}
      >
        Submit
      </Button>

    
    </div>
  );
};

export default Form1;
