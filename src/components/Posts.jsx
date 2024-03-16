import React, { useContext } from "react";
import * as Icon from "react-feather";
import UserIcon from "../assests/img/userIcon.png";
import { Context } from "../context/StateProvider";


function Posts({ data }) {
  const { user } = useContext(Context);
  return (
    <div className="flex justify-center items-center flex-col gap-y-8">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex justify-center items-center flex-col bg-teal-700 rounded-md text-white"
        >
          <div className="w-full py-3 px-4 flex items-center gap-x-2">
            <img
              src={user && user.pic !== "null" ? user.pic : UserIcon}
              alt="userimg"
              className="h-[50px] w-[50px] rounded-full object-cover"
            />
            <span>{user && user.userName}</span>
          </div>
          <div className="flex justify-center items-start  flex-col">
            <span className="py-2 px-4">{item.postCaption}</span>
            <img
              src={item.img}
              alt="postImg"
              className="h-[350px] w-[300px] object-fill"
            />
          </div>
          <div className="flex justify-start items-start gap-x-4 w-full px-4 py-2">
            <div className="flex justify-center items-center flex-col">
              <Icon.Heart size={25} stroke="white" />
              <span>{item.interactions.likes + " "} likes</span>
            </div>
            <div className="flex justify-center items-center flex-col">
              <Icon.MessageCircle size={25} stroke="white" />
              <span>{item.interactions.comments.length + " "} comments</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
