import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apis/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { SetLoading } from "../redux/loadersSlice";

function ProtectedPage({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      dispatch(SetUser(response.data));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Logout successfully');
    navigate('/login');
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getCurrentUser();
    }
  }, []);

  return <div>
    <div className="flex justify-between items-center bg-primary p-3 shadow-3xl">
      <span className="font-bold text-terciary text-2xl cursor-pointer" onClick={() => { navigate('/') }}>Movie World</span>
      <div className="flex items-center gap-2 bg-white rounded px-5 py-2 shadow-3xl">
        <i className="ri-user-2-line text-terciary font-bold" onClick={() => { navigate('/admin') }}></i>
        <span className="text-terciary font-bold text-sm cursor-pointer underline" onClick={() => { navigate('/profile') }}> {user?.name} </span>
        <i className="ri-logout-box-r-line ml-8 text-terciary font-bold"
          onClick={handleLogout}></i>
      </div>
    </div>
    {user && <div className="p-5">
      {children}
    </div>}
  </div>;
};

export default ProtectedPage;
