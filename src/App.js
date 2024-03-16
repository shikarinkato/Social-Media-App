import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { Context } from "./context/StateProvider";
import Login from "./screens/Login";
import Main from "./screens/Main";
import SignUp from "./screens/SignUp";
import UserPage from "./screens/UserPage";
import UserPosts from "./screens/UserPosts";

function App() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    GetUser,
    GetUserPosts,
    user,
    loading,
  } = useContext(Context);
  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      setIsAuthenticated(true);

      GetUser();
      if (user._id) {
        GetUserPosts(user._id);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [
    isAuthenticated,
    loading,
    GetUser,
    GetUserPosts,
    setIsAuthenticated,
    user._id,
  ]);

  return (
    <div className=" flex h-full w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/posts" element={<UserPosts />} />
        <Route path="/searchedUser/:userId" element={<UserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
