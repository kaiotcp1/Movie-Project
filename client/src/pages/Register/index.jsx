import React, { useEffect } from "react";
import { Form, Button, Input, message } from 'antd';
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import { antValidationError } from "../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
const { Item } = Form;

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await RegisterUser(values);
      dispatch(SetLoading(false));
      message.success(response.message);
      navigate("/login");
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
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      <div className='flex flex-col items-center justify-center bg-primary md:h-auto pb-3'>
      <h1 className="logo text-8xl text-terciary">MOVIE</h1>
          <h1 className="logo text-7xl text-terciary">WORLD</h1>
          <span className=" logo text-white text-center">
            One stop for all your movie review, ratings and recommendations
          </span>
      </div>
      <div className="flex items-center justify-center font-black shadow-4xl">
        <div className="w-[300px] md:w-[400px]">
          <h1 className="text-2xl my-2 text-primary">Register Your Account</h1>
          <hr />
          <Form layout='vertical' onFinish={onFinish}>
            <Item label="Name" name="name">
              <Input type='text' />
            </Item>
            <Item label="Email" name="email">
              <Input type='text' />
            </Item>
            <Item label="Password" name="password">
              <Input type='password' />
            </Item>
            <div className='flex flex-col gap-2'>
              <Button type="primary" htmlType="submit" block className='bg-primary hover:bg-terciary mt-5 !important'>Register</Button>
              <Link to="/login" className='text-black hover:text-terciary text-center'>Already have an account? Login here</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
