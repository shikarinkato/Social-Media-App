import React, { useContext, useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import UserIcon from "../assests/img/userIcon.png";
import { Context } from "../context/StateProvider";

function Posts({ item }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const { isAuthenticated, ChangeLikes, user, AddComment, DeletePost } =
    useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowComment(false);
    });
  }, []);

  console.log(item.user);
  return (
    <div className="flex justify-center items-center flex-col bg-teal-700 rounded-md text-white lg:w-full xl:w-5/6 2xl:w-4/6 ">
      {showCommentBox && (
        <div className=" h-screen fixed top-0 left-0 z-[1999] w-full backdrop:blur-[10px] bg-[rgba(255,255,255,0.4)] ">
          <div className=" py-3 pt-8 px-5 w-5/6 sm:w-3/6 lg:w-3/6 xl:w-2/6 2xl:w-1/5 fixed top-1/2 -left-32 sm:left-0 xl:left-1/4 2xl:left-1/3 translate-x-[50%] translate-y-[0%] bg-teal-700  rounded-md">
            <textarea
              name="commentBox"
              id="commentBox"
              cols="10"
              rows="3"
              className="rounded-md w-full outline-none border-none p-1 text-gray-900"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
            <div className=" w-full flex justify-between items-center py-3 text-white font-semibold ">
              <button
                onClick={() => {
                  setShowCommentBox(false);
                }}
                className=" bg-red-600 py-1 px-3 rounded-md"
              >
                Discard
              </button>
              <button
                onClick={() => {
                  AddComment(comment, item._id, item.user.userId, user._id);
                  setShowCommentBox(false);
                }}
                className=" bg-teal-600 py-1 px-3 rounded-md"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full py-3 px-4 flex items-center gap-x-2 relative">
        <img
         src={
          (item.user && item.user.pic !== "null") || item.user.pic === ""
            ? item.user.pic
            : UserIcon
        }
          alt="userimg"
          className="h-[50px] w-[50px] rounded-full object-cover"
        />
        <span>{item.user && item.user.userName}</span>
        {isAuthenticated && item.user.userId === user._id && (
          <span className=" absolute right-2 top-3 cursor-pointer">
            <Icon.Trash2
              onClick={() => {
                DeletePost(item._id);
              }}
              size={25}
              stroke="white"
            />
          </span>
        )}
      </div>
      <div className="flex justify-center items-center  flex-col w-full mr-4 lg:w-[20vw]">
        <span className=" text-start py-2 px-4 w-full">{item.postCaption}</span>
        {item.img && (
          <img
            src={item.img}
            alt="postImg"
            className="h-auto max-h-[400px] w-[300px] object-contain"
          />
        )}
      </div>
      <div className="flex justify-between items-start gap-x-4 w-full px-4 py-2">
        <div className=" flex  items-center  gap-x-2  w-full">
          <div className="flex justify-center items-center flex-col gap-y-1">
            <Icon.Heart
              size={25}
              stroke="white"
              fill={
                user &&
                item.interactions &&
                item.interactions.likes.some(
                  (i) => i.byUser.toString() === user._id.toString()
                )
                  ? "white"
                  : "transparent"
              }
              className=" cursor-pointer w-[20px] h-[20px] sm:h-[25px] sm:w-[25px]"
              onClick={() => {
                if (isAuthenticated) {
                  if (item.interactions.likes.length > 0) {
                    if (
                      !item.interactions.likes.some(
                        (item) => item.byUser.toString() === user._id.toString()
                      )
                    ) {
                      ChangeLikes("add", item._id, item.user.userId, user._id);
                    } else {
                      ChangeLikes(
                        "remove",
                        item._id,
                        item.user.userId,
                        user._id
                      );
                    }
                  } else {
                    ChangeLikes("add", item._id, item.user.userId, user._id);
                  }
                } else if (!isAuthenticated) {
                  navigate("/login");
                } else {
                  return null;
                }
              }}
            />
            <span className="text-[14px] sm:text-[16px] font-medium whitespace-nowrap">
              {item.interactions && item.interactions.likes.length + " "} likes
            </span>
          </div>
          <div className="flex justify-center items-center flex-col gap-y-1">
            <Icon.MessageCircle
              size={25}
              stroke="white"
              className=" cursor-pointer w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]"
              onClick={() => {
                if (isAuthenticated) {
                  setShowCommentBox(true);
                } else if (!isAuthenticated) {
                  navigate("/login");
                } else {
                  return null;
                }
              }}
            />
            <span className=" text-[14px]  sm:text-[16px] whitespace-nowrap">
              {item.interactions && item.interactions.comments.length + " "}{" "}
              comments
            </span>
          </div>
        </div>
        <div className=" self-end">
          <span
            onClick={() => {
              setShowComment(!showComment);
            }}
            className=" underline text-[15px] hover:text-gray-300 cursor-pointer whitespace-nowrap"
          >
            {showComment ? "Hide all comments" : "View all comments"}
          </span>
        </div>
      </div>
      {showComment && (
        <div className=" w-full py-1  px-2 border-t-[1px] border-white overflow-hidden  bg-teal-700 rounded-md gap-y-2">
          <h1>Comments</h1>
          <div className=" flex flex-col items-start gap-y-2">
            {item &&
              item.interactions &&
              item.interactions.comments.map((i, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between items-start gap-x-1  p-1 text-[14px]"
                >
                  <span className="">{i.byUser.userName}</span>
                  <span className=" ml-2 w-full sm:w-[20vw]">{i.comment}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
