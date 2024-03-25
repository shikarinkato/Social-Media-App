import React, { useContext } from "react";
import { Context } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import RecentFollowers from "./RecentFollower";
import RecentComments from "./RecentComments";
import { recentFollowers } from "../constants";
import { LogOut } from "react-feather";

const Sidebar = () => {
  const { isAuthenticated, setIsAuthenticated, user, userPosts } =
    useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="hidden  lg:flex fixed xl:h-screen h-full  z-[97] top-[9rem] xl:top-[8.9rem] 2xl:top-[8.5rem] left-0">
      {isAuthenticated ? (
        <div className=" h-full w-[30vw] xl:w-[23vw] 2xl:w-[20vw] bg-gray-950 ">
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
              User ID:- {user && user._id}
            </span>
            <div className=" flex justify-center items-center flex-col gap-y-2 mt-8 relative">
              <h1 className="text-3xl font-semibold text-white">
                {user && user.userName}
              </h1>
              <h3 className="text-gray-200 text-[13px] font-medium border-b-[1px] border-teal-700">
                {user && user.name}
              </h3>
            </div>
            <div className="flex justify-between items-center w-full px-6">
              <div
                className="  text-center cursor-pointer"
                onClick={() => navigate("/user/posts")}
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
                  {user && user.followers && user.followers.length > 0
                    ? user.followers.length
                    : 0}
                </h4>
                <span className="text-[13px] text-gray-100 font-semibold border-b-[1px] border-teal-700">
                  Followers
                </span>
              </div>
              <div className="text-center cursor-pointer">
                <h4 className="text-xl text-white">
                  {user && user.followings && user.followings.length > 0
                    ? user.followings.length
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
      ) : (
        <div className=" h-full xl:w-[23vw] 2xl:w-[20vw] bg-gray-950 ">
          <div className="absolute w-full top-0 left-0 h-full skeleton1Bg z-[99] flex justify-center items-center flex-col gap-y-8 text-white">
            <button
              onClick={() => navigate("/login")}
              className="bg-teal-600 py-1 px-6 rounded-md text-white font-semibold text-xl"
            >
              Log in
            </button>
            <span className="text-xl font-semibold bg-black py-1 px-3 rounded-md shadow-lg shadow-black">
              or
            </span>
            <button
              onClick={() => navigate("/signup")}
              className="bg-teal-600 py-1 px-6 rounded-md text-white font-semibold text-xl"
            >
              Sign Up
            </button>
          </div>
          <div className="p-3 gap-y-6 flex justify-center items-center flex-col w-full relative ">
            <span className="absolute top-2 text-gray-200 text-[12px] right-3">
              User ID:- 5346bjb346n25346n
            </span>
            <div className=" flex justify-center items-center flex-col gap-y-2 mt-8 relative">
              <h1 className="text-3xl font-semibold text-white">raman_12</h1>
              <h3 className="text-gray-200 text-[13px] font-medium border-b-[1px] border-teal-700">
                Raman Pratap Singh
              </h3>
            </div>
            <div className="flex justify-between items-center w-full px-6">
              <div className="  text-center cursor-pointer">
                <h4 className="text-xl text-white">9</h4>
                <span className="text-[13px] text-gray-100 font-semibold border-b-[1px] border-teal-700">
                  Posts
                </span>
              </div>
              <div className="text-center cursor-pointer">
                <h4 className="text-xl text-white ">340</h4>
                <span className="text-[13px] text-gray-100 font-semibold border-b-[1px] border-teal-700">
                  Followers
                </span>
              </div>
              <div className="text-center cursor-pointer">
                <h4 className="text-xl text-white">89</h4>
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
      )}
    </div>
  );
};

export default Sidebar;
