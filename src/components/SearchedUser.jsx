import React, { useContext } from "react";
import UserIcon from "../assests/img/userIcon.png";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/StateProvider";

function SearchedUser({ user }) {
  const navigate = useNavigate();
  const { setSearchedUsers } = useContext(Context);

  return (
    <div
      className="w-full flex  gap-x-6 items-center py-2 px-3 rounded-md bg-teal-700 cursor-pointer"
      onClick={() => {
        navigate(`/searchedUser/${user._id}`);
        setSearchedUsers([]);
      }}
    >
      <div className=" h-[60px] w-[60px]">
        <img
          src={user.pic !== "null" ? user.pic : UserIcon}
          alt="userImg"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-xl font-medium text-white">{user.userName}</span>
    </div>
  );
}

export default SearchedUser;
