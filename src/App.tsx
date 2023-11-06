import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  InputNumber,
  Space,
} from "antd";
import { isNaN } from "lodash";
import { useState } from "react";

const App = () => {
  const [form] = Form.useForm();

  const [state, setState] = useState("");

  const onReset = () => {
    setState("");
    form.resetFields();
  };

  const onFinish = (values: any) => {
    // console.log("Success:", values);
    const distant = values.distant;
    const price = values.price;
    const result1 = (distant * price) / 10;
    const result2 = distant * 2.7;
    const res = (result1 + result2).toFixed(2);

    setState(
      !isNaN(Number(res))
        ? "ค่าน้ำมันที่นำไปเขียนเบิก คือ " +
            Number(res).toLocaleString() +
            " บาท"
        : ""
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div
        style={{
          backgroundColor: "#FAFAFA",
          padding: 20,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <div>
          <h1>คำนวณค่านำมัน</h1>
        </div>
        <ConfigProvider
        // theme={{
        //   token: {
        //     controlHeight: 40
        //   },
        // }}
        >
          <Form
            layout="vertical"
            form={form}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="ระยะทาง (กิโลเมตร)"
              name="distant"
              required
              tooltip="เป็นระยะทางรวมทั้งขาไปและขากลับ"
            >
              <InputNumber
                style={{ minWidth: 600 }}
                placeholder="ระบุเฉพาะตัวเลข"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="ราคาน้ำมัน (บาท/ลิตร)"
              name="price"
              required
              tooltip="ราคาน้ำมัน ณ ปัจจุบัน ตามประเภทน้ำมันที่รถคุณใช้"
            >
              <InputNumber
                style={{ minWidth: 600 }}
                placeholder="ระบุเฉพาะตัวเลข"
                size="large"
              />
            </Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                // disabled={isEmpty(inputDistant) || isEmpty(inputPrice)}
              >
                คำนวณ
              </Button>
              <Button type="text" onClick={onReset}>
                ล้างค่า
              </Button>
            </Space>
          </Form>
        </ConfigProvider>
        <div>{state !== "" && <h1>{state}</h1>}</div>
        <Divider style={{ marginTop: 40 }} />
        <div>
          <h3>วิธีคำนวณค่าน้ำมันด้วยตนเอง</h3>
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              background: "white",
            }}
          >
            <img
              src="content.png"
              style={{ maxWidth: 900, width: "100%" }}
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        style={{ borderRadius: 10, overflow: "hidden", background: "white" }}
      >
        <iframe
          // width="320"
          width="290"
          // height="875"
          height="100%"
          src="https://oil-price.bangchak.co.th/BcpOilPrice1/th"
          frameBorder={0}
        ></iframe>
      </div>
    </div>
  );
};

export default App;
