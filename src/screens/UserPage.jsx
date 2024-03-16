import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../context/StateProvider";
import { toast } from "react-toastify";
import UserIcon from "../assests/img/userIcon.png";

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
  } = useContext(Context);
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
  if (user) {
    let get = user.followings.some((item) => item.id === searchedUser._id);
  }

  return (
    <div className=" w-full h-full mt-36">
      <div className=" w-full h-full flex justify-center items-center">
        <div className="w-2/6 h-full p-8 flex justify-center items-start">
          <div className="flex justify-between  items-center flex-col border-[1px] border-gray-800 rounded-md p-6 gap-y-8">
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
              <button
                onClick={() => {
                  if (isAuthenticated && searchedUser) {
                    ChangeFollowings(searchedUser._id, "add", searchedUser.pic);
                  } else if (!isAuthenticated) {
                    navigate("/login");
                  } else {
                    return null;
                  }
                }}
                className={`w-full bg-teal-400 ${
                  user &&
                  user.followings.find(
                    (item) => item.id === searchedUser._id
                  ) &&
                  "bg-teal-700"
                } py-1 px-2 font-medium text-xl`}
              >
                {user &&
                user.followings.find((item) => item.id === searchedUser._id)
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
            <div className=" w-full border-t-[1px] border-gray-900">
              {searchedUserPosts && searchedUserPosts.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-3 gap-y-2 ">
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
