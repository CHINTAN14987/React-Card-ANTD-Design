import logo from "./logo.svg";
import "./App.css";
import { Row, Col, Card, AutoComplete } from "antd";
import Data from "./Data";
import "antd/dist/antd.css";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  DeleteFilled,
  HeartTwoTone,
  HeartFilled,
} from "@ant-design/icons";
import { Form, Input, Checkbox } from "antd";
import { AiOutlineHeart } from "react-icons/ai";

import { useState } from "react";
import { Modal, Button } from "antd";

const App = () => {
  const [ind, setInd] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [like, setLike] = useState(false);
  const [selected1, setSelected1] = useState({
    myName: "",
    email: "",
    phone: "",
    website: "",
  });

  const handlesave = () => {
    setIsModalVisible(false);
    let updatedData = selected;
    updatedData.splice(ind, 1, selected1);
    console.log(updatedData, "updated");
    setSelected(updatedData);
  };
  // const [formValue, setFormValue] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   website: "",
  // });
  const showModal = (i) => {
    setIsModalVisible(true);
    setSelected1(i);
  };
  const likeToggle = (id) => {
    console.log(id);

    for (const a of selected) {
      if (a.id == id) {
        setLike(!like);
      }
    }
  };
  const handleChange = (e) => {
    // setFormValue({ ...formValue, [e.target.name]: e.target.value });
    // console.log(formValue);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [selected, setSelected] = useState(Data);
  // const handleClick = (i) => {
  //   setLike({ oindex: i });
  // };

  const handleDelete = (i) => {
    const filteredItems = selected.filter((myitems) => myitems.id !== i.id);
    setSelected(filteredItems);
  };
  return (
    <div>
      {console.log(selected, "selected1")}
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
                  <div
                    onClick={() => {
                      likeToggle(index);
                    }}
                  >
                    {like ? (
                      <HeartFilled className="heartLike" />
                    ) : (
                      <AiOutlineHeart className="heart" />
                    )}
                  </div>,
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      setInd(index);
                      showModal(item);
                    }}
                  />,
                  <DeleteFilled
                    onClick={() => {
                      handleDelete(item);
                    }}
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
        {isModalVisible && (
          <div>
            <input
              type="text"
              value={selected1?.myName}
              onChange={(e) => {
                setSelected1({
                  ...selected1,
                  myName: e.target.value,
                });
              }}
            ></input>

            <input
              type="text"
              value={selected1?.email}
              onChange={(e) => {
                setSelected1({
                  ...selected1,
                  email: e.target.value,
                });
              }}
            ></input>
            <button onClick={() => setIsModalVisible(false)}>Close</button>
            <button onClick={handlesave}>save</button>
            {console.log("hello")}
          </div>
        )}
        {/* <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            // autoComplete="off"
          >
            <Form.Item label="Name" rules={[{ required: true }]}>
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

            <Form.Item label="Email" rules={[{ required: true }]}>
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
              rules={[{ required: true, message: "Phone" }]}
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
              rules={[{ required: true, message: "Website" }]}
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
        </Modal> */}
      </>
    </div>
  );
};

export default App;
