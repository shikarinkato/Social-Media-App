import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Posts from "../components/Posts";
import RecentComments from "../components/RecentComments";
import RecentFollowers from "../components/RecentFollower";
import { recentFollowers } from "../constants";

import { LogOut } from "react-feather";
import "swiper/css";
import { Context } from "../context/StateProvider";
import { useEffect } from "react";

const UserPosts = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    GetUser,
    posts,
    userPosts,
    GetUserPosts,
  } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <div className=" bg-gray-300 h-full w-full">
      <div className="flex items-start justify-start overflow-hidden ">
        <div className=" w-[20vw] bg-gray-950 fixed h-screen  z-[97] top-[8.5rem]">
          <div className="p-3 gap-y-6 flex justify-center items-center flex-col w-full relative">
            <span
              className={
                isAuthenticated
                  ? "absolute left-2 top-4 cursor-pointer"
                  : "hidden"
              }
              onClick={() => {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                setIsAuthenticated(false);
              }}
            >
              <LogOut size={30} stroke="white" />
            </span>
            <span className="absolute top-2 text-gray-200 text-[12px] right-3">
              User ID:- {user._id}
            </span>
            <div className=" flex justify-center items-center flex-col gap-y-2 mt-8 relative">
              <h1 className="text-3xl font-semibold text-white">
                {user.userName}
              </h1>
              <h3 className="text-gray-200 text-[13px] font-medium border-b-[1px] border-teal-700">
                {user.name}
              </h3>
            </div>
            <div className="flex justify-between items-center w-full px-6">
              <div
                className="  text-center cursor-pointer"
                onClick={() => navigate("user/posts")}
              >
                <h4 className="text-xl text-white">
                  {userPosts && userPosts.length > 0 ? userPosts.length : 0}
                </h4>
                <span className="text-[13px] text-gray-100 font-semibold border-b-[1px] border-teal-700">
                  Posts
                </span>
              </div>
              <div className="text-center cursor-pointer">
                <h4 className="text-xl text-white ">
                  {user.followers && user.followers.length > 0
                    ? user.followers
                    : 0}
                </h4>
                <span className="text-[13px] text-gray-100 font-semibold border-b-[1px] border-teal-700">
                  Followers
                </span>
              </div>
              <div className="text-center cursor-pointer">
                <h4 className="text-xl text-white">
                  {user.followings && user.followings.length > 0
                    ? user.followings
                    : 0}
                </h4>
                <span className="text-[13px] text-gray-100 font-semibold border-b-[1px] border-teal-700">
                  Followings
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <RecentFollowers data={recentFollowers} />
            <RecentComments data={recentFollowers} />
          </div>
        </div>
        <div className="w-full h-full min-h-screen overflow-y-auto  bg-gray-300 relative top-[8.5rem] left-[22%] mb-48 flex justify-between ">
          <div className="w-2/6 mt-12 px-6  flex justify-start items-start gap-y-6 flex-col">
            <div className="border-b-2 border-gray-600 w-full">
              <h2 className="text-2xl font-semibold text-gray-600">
                User Posts
              </h2>
            </div>
            <div className=" overflow-y-auto w-full flex justify-start items-start self-start ">
              {userPosts.length > 0 ? (
                <Posts data={userPosts} />
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
          <div className=" w-1/2 h-full mt-12 px-6 flex  gap-y-8 items-start flex-col fixed -right-[15rem] top-[8rem] min-h-screen">
            <div className="w-full h-1/2  flex justify-normal items-center">
              <div className="h-full w-2/5 bg-gray-400 text-gray-700 flex justify-center items-center">
                {" "}
                <span>Advertisement</span>
              </div>
            </div>
            <div className="w-2/3 h-[8rem] ">
              <Swiper
                spaceBetween={20}
                autoplay={{ delay: 2000 }}
                slidesPerView={1}
                modules={[Autoplay]}
                loop={true}
                className="h-full"
              >
                {Array.from({ length: 5 }).map((item, idx) => (
                  <SwiperSlide className="w-full h-full " key={idx}>
                    <div
                      className="bg-red-600 h-full w-full flex justify-center items-center"
                      key={idx}
                    >
                      Advertisement {idx + 1}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
