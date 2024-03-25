import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../context/StateProvider";
import { toast } from "react-toastify";
import UserIcon from "../assests/img/userIcon.png";
import RecentFollowers from "../components/RecentFollower";
import RecentComments from "../components/RecentComments";
import { LogOut } from "react-feather";
import { motion, useAnimation } from "framer-motion";
import Sidebar from "../components/Sidebar";

const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    GetSearchedUser,
    searchedUser,
    searchedUserPosts,
    ChangeFollowings,
    user,
    userPosts,
    setIsAuthenticated,
  } = useContext(Context);

  const unfollowBox = useAnimation();

  useEffect(() => {
    if (params.userId) {
      GetSearchedUser(params.userId);
    } else {
      toast.error("User ID not found", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [params.userId, GetSearchedUser]);

  return (
    <div className=" w-full h-full mt-36">
      <div className=" w-full h-full flex justify-center items-center">
        <Sidebar />

        <div className=" w-5/6 xl:w-2/6 h-full p-8 flex justify-center items-start relative  lg:left-28 left-0">
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0.5, scale: 0 }}
              animate={unfollowBox}
              transition={{ duration: 1.5, ease: "circInOut", delay: 0.1 }}
              className="bg-teal-700 p-3 rounded-md w-2/3 flex justify-between items-center gap-y-4 flex-col font-semibold absolute top-1/2 -translate-x-[100%] -translate-y-[50%] text-white"
            >
              <span>Are you sure to unfollow ?</span>
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => unfollowBox.start({ opacity: 0, scale: 0 })}
                  className="bg-red-600 py-1 px-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    ChangeFollowings(
                      searchedUser._id,
                      "remove",
                      searchedUser.pic
                    );
                    window.location.reload();
                  }}
                  className="bg-white py-1 px-2 rounded-md text-teal-700"
                >
                  Unfollow
                </button>
              </div>
            </motion.div>
          )}
          <div className="flex justify-between  items-center flex-col border-[1px] border-gray-800 rounded-md p-6 gap-y-8 sm:mt-24 xl:mt-8 2xl:mt-0">
            <div className="flex justify-between w-full items-center gap-x-6">
              <div className=" bg-teal-700 rounded-full p-1">
                <div className=" h-[80px] w-[80px] overflow-hidden p-1 bg-white rounded-full">
                  <img
                    src={
                      searchedUser && searchedUser.pic !== null
                        ? searchedUser.pic
                        : UserIcon
                    }
                    className="h-full w-full object-contain rounded-full"
                    alt={`${searchedUser && searchedUser.userName}'s pic`}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center flex-col gap-y-4">
                <span className="text-gray-900 text-2xl font-medium">
                  {searchedUser && searchedUser.userName}
                </span>
                <div className=" flex justify-between items-center gap-x-3 text-[15px]">
                  <div className="flex justify-center items-center flex-col">
                    <span>
                      {searchedUserPosts && searchedUserPosts.length > 0
                        ? searchedUserPosts.length
                        : 0}
                    </span>
                    <span>Posts</span>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <span>
                      {searchedUser && searchedUser.followers.length > 0
                        ? searchedUser.followers.length
                        : 0}
                    </span>
                    <span>Followers</span>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <span>
                      {searchedUser && searchedUser.followings.length > 0
                        ? searchedUser.followings.length
                        : 0}
                    </span>
                    <span>Followings</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full rounded-md overflow-hidden text-white">
              {user &&
              user.followings.find((item) => item.id === searchedUser._id) ? (
                <button
                  onClick={() => {
                    if (isAuthenticated && searchedUser) {
                      unfollowBox.start({ opacity: 1, scale: 1 });
                    } else {
                      return null;
                    }
                  }}
                  className={`w-full  
                    bg-teal-700
                   py-1 px-2 font-medium text-xl`}
                >
                  Following
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (isAuthenticated && searchedUser) {
                      ChangeFollowings(
                        searchedUser._id,
                        "add",
                        searchedUser.pic
                      );
                      // window.location.reload();
                    } else if (!isAuthenticated) {
                      navigate("/login");
                    } else {
                      return null;
                    }
                  }}
                  className={`w-full bg-teal-400  py-1 px-2 font-medium text-xl`}
                >
                  Follow
                </button>
              )}
            </div>
            <div className=" w-full border-t-[1px] border-gray-900">
              {searchedUserPosts && searchedUserPosts.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-3 gap-y-2 mt-3 ">
                  {searchedUserPosts.map((item, idx) => (
                    <img
                      key={idx}
                      src={item.img}
                      className="h-[120px] w-[120px] object-contain bg-gray-300"
                      alt="searchedImg"
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-300 py-8 w-full flex justify-center items-center px-4 flex-col text-gray-400">
                  <h1 className="text-[3vw] font-semibold opacity-75">
                    (╥ _ ╥)
                  </h1>
                  <span className=" opacity-75 text-[2.4vw] font-semibold">
                    No Posts Available
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
