import "./App.css";
import { Row, Col, Card } from "antd";
import Data from "./Data";
import "antd/dist/antd.css";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Form, Input } from "antd";

import { useState } from "react";
import { Modal } from "antd";

const App = () => {
  const [ind, setInd] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState(Data);
  const [selected1, setSelected1] = useState({
    myName: "",
    email: "",
    phone: "",
    website: "",
  });

  const showModal = (i) => {
    setIsModalVisible(true);
    setSelected1(i);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    let updatedData = selected;
    updatedData.splice(ind, 1, selected1);
    console.log(updatedData, "updated");
    setSelected(updatedData);
    setIsModalVisible(false);
  };

  const editHandler = (item, index) => {
    setInd(index);
    showModal(item);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (i) => {
    const filteredItems = selected.filter((myitems) => myitems.id !== i.id);
    setSelected(filteredItems);
  };
  return (
    <div>
      <Row>
        {selected.map((item, index) => {
          const { id, myName, img, phone, email, website } = item;
          return (
            <Col span={6} xs={24} sm={24} md={8} lg={8} xl={6} key={id}>
              <Card
                style={{ margin: "15px" }}
                cover={
                  <div
                    style={{
                      background: "#ececec",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      alt="/"
                      src={img}
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                    />
                  </div>
                }
                actions={[
                  <div className="container">
                    <input
                      className="red-heart-checkbox"
                      type="checkbox"
                      id="heart"
                    />
                  </div>,
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      editHandler(item, index);
                    }}
                  />,
                  <DeleteFilled
                    onClick={() => {
                      handleDelete(item);
                    }}
                    style={{ fontSize: "18px" }}
                  />,
                ]}
              >
                <h3>{myName}</h3>
                <div style={{ marginBottom: "10px" }}>
                  <MailOutlined style={{ fontSize: "20px" }} />

                  <span style={{ margin: "10px", color: "#000000a6" }}>
                    {email}
                  </span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <PhoneOutlined style={{ fontSize: "20px" }} />
                  <span style={{ margin: "10px", color: "#000000a6" }}>
                    {phone}
                  </span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <GlobalOutlined style={{ fontSize: "20px" }} />

                  <span style={{ margin: "10px", color: "#000000a6" }}>
                    {website}
                  </span>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      <>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {console.log(selected1)}
          <Form name="basic" wrapperCol={{ span: 16 }}>
            <Form.Item
              label="Name"
              rules={[{ required: true }]}
              className="mylabel"
              style={{ justifyContent: "end" }}
            >
              <Input
                type="text"
                value={selected1?.myName}
                onChange={(e) => {
                  setSelected1({
                    ...selected1,
                    myName: e.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              className="mylabel"
              label="Email"
              rules={[{ required: true }]}
              style={{ justifyContent: "end" }}
              type="email"
            >
              <Input
                type="text"
                value={selected1?.email}
                onChange={(e) => {
                  setSelected1({
                    ...selected1,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              className="mylabel"
              rules={[{ required: true, message: "Phone" }]}
              style={{ justifyContent: "end" }}
            >
              <Input
                type="text"
                value={selected1?.phone}
                onChange={(e) => {
                  setSelected1({
                    ...selected1,
                    phone: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Website"
              className="mylabel"
              rules={[{ required: true, message: "Website" }]}
              style={{ justifyContent: "end" }}
            >
              <Input
                type="text"
                value={selected1?.website}
                onChange={(e) => {
                  setSelected1({
                    ...selected1,
                    website: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default App;
