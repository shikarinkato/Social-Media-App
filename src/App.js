import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const {
    isAuthenticated,
    setIsAuthenticated,
    GetUser,
    GetUserPosts,
    user,
    loading,
    FetchGlobalPosts,
  } = useContext(Context);

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      setIsAuthenticated(true);
      GetUser();
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, loading, GetUser, setIsAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user) {
      GetUserPosts(user._id);
    }

    FetchGlobalPosts();
  }, [loading]);

  return (
    <div className=" flex h-full w-full">
      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <Header />
      )}
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
