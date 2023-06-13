import React, { useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apis/users";
import { antValidationError } from "../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
const { Item } = Form;


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await LoginUser(values);
      dispatch(SetLoading(false));
      localStorage.setItem("token", response.data);
      message.success(response.message);
      navigate("/");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex items-center justify-center flex-col bg-primary md:h-auto">
        <div> 
          <h1 className="logo text-8xl text-terciary">MOVIE</h1>
          <h1 className="logo text-7xl text-terciary">WORLD</h1>
          <span className=" logo text-white text-center">
            One stop for all your movie review, ratings and recommendations
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center font-black shadow-4xl">
        <div className="w-[300px] md:w-[400px]">
          <h1 className="text-2xl my-2 text-primary">Login to your Account</h1>
          <hr />
          <Form layout="vertical" onFinish={onFinish}>
            <Item label="Email" name="email">
              <Input type="text" />
            </Item>
            <Item label="Password" name="password">
              <Input type="password" />
            </Item>
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-primary hover:bg-terciary mt-5 !important"
              >
                Login
              </Button>
              <Link to="/register" className="text-black hover:text-terciary text-center">
                Don't have an account? Register here
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
