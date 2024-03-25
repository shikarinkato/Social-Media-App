import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Posts from "../components/Posts";

import { useEffect } from "react";
import "swiper/css";
import Sidebar from "../components/Sidebar";
import { Context } from "../context/StateProvider";
import AdvertisementContainer from "./AdvertisementContainer";

const UserPosts = () => {
  const { isAuthenticated, setIsAuthenticated, userPosts } =
    useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      setIsAuthenticated(true);
    } else {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [isAuthenticated, navigate, setIsAuthenticated]);
  console.log(isAuthenticated);

  return (
    <div className=" bg-gray-300 h-full w-full">
      <div className="flex items-start justify-start overflow-hidden ">
        <Sidebar />
        <div className="w-full h-full min-h-screen overflow-y-auto  bg-gray-300 relative top-[9rem] xl:top-[8.9rem] 2xl:top-[8.5rem] left-[5%]  lg:left-[30%] xl:left-[25%]  2xl:left-[22%] mb-48 flex justify-between ">
          <div className="w-[90%] sm:w-3/6 lg:w-2/6 mt-12 px-6  flex justify-start items-start gap-y-6 flex-col">
            <div className="border-b-2 border-gray-600 w-full">
              <h2 className="text-2xl font-semibold text-gray-600">
                User Posts
              </h2>
            </div>
            <div className=" overflow-y-auto w-full flex justify-start items-start self-start gap-y-6 flex-col ">
              {userPosts.length > 0 ? (
                userPosts.map((item, idx) => <Posts item={item} key={idx} />)
              ) : (
                <div className="h-[35rem]  w-full flex justify-center items-center flex-col text-gray-600">
                  <h1 className="text-[8vw] font-bold opacity-80">(='X'=)</h1>
                  <span className="text-[3vw] font-semibold opacity-80">
                    Sorry we have 0 Posts
                  </span>
                </div>
              )}
            </div>
          </div>
          <AdvertisementContainer />
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
