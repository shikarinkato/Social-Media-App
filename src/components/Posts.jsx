import React, { useContext, useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import UserIcon from "../assests/img/userIcon.png";
import { Context } from "../context/StateProvider";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";

function Posts({ item }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const {
    isAuthenticated,
    ChangeLikes,
    user,
    AddComment,
    DeletePost,
    FetchGlobalPosts,
    loading,
    setLoading,
  } = useContext(Context);
  const postRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.addEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    setShowComment(false);
    setShowCommentBox(false);
  }

  function handleUpdateClick(e) {
    e.stopPropagation();
    let timer = setTimeout(() => {
      console.log(e.target);
      if (
        e.target.getAttribute("name") ||
        e.target.closest("[name=like]").getAttribute("name") == "like"
      ) {
        console.log("Like Container");
        FetchGlobalPosts();
        clearTimeout(timer);
      } else if (e.target.getAttribute("name") == "like") {
        console.log("Delete");
        FetchGlobalPosts();
        clearTimeout(timer);
      }
    }, 1000);
  }

  return (
    <section
      onClick={handleUpdateClick}
      className="flex justify-center items-center flex-col bg-teal-700 rounded-md text-white lg:w-full xl:w-5/6 2xl:w-4/6  min-h-[180px]"
    >
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
        <div className="border-solid border-2 border-white rounded-full h-[53px] w-[53px] ">
          {loading ? (
            <span className="h-[50px] w-[50px] rounded-full inline-block skeleton p-1"></span>
          ) : (
            <img
              src={
                (item.user && item.user.pic !== null) || item.user.pic === ""
                  ? item.user.pic
                  : UserIcon
              }
              alt="userimg"
              className="h-[50px] w-[50px] rounded-full object-cover"
            />
          )}
        </div>
        <span
          className={`${
            loading ? "skeleton h-[25px] w-[120px] rounded-md" : ""
          }`}
        >
          {!loading && item.user && item.user.userName}
        </span>
        {isAuthenticated && item.user.userId === user._id && (
          <span
            className={`absolute right-2 top-3 cursor-pointer ${
              loading ? "skeleton h-[30px] w-[20px]" : ""
            }`}
          >
            {!loading && (
              <Icon.Trash2
                name="delete"
                onClick={() => {
                  DeletePost(item._id);
                }}
                size={25}
                stroke="white"
              />
            )}
          </span>
        )}
      </div>
      <div className="flex justify-center items-center  flex-col w-full lg:w-[20vw]">
        {loading ? (
          <div className="flex justify-start items-start flex-col gap-2 py-3 w-[80%]">
            {Array.from({ length: 3 }).map((i, idx) => (
              <span
                style={{ width: `${idx == 0 || idx == 2 ? "200px" : "170px"}` }}
                key={idx * 0.005 * 0.02341}
                className={`text-start  w-full ${
                  loading ? `h-[10px]  skeleton rounded-lg inline-block` : ""
                }`}
              ></span>
            ))}
          </div>
        ) : (
          <span
            className={`text-start py-2 px-4 w-full ${
              loading ? "h-[30px] w-[150px] skeleton" : ""
            }`}
          >
            {item.postCaption}
          </span>
        )}

        {loading || item.img === null ? (
          <span className=" max-h-[400px] h-[200px] w-[306px] skeleton"></span>
        ) : item.img ? (
          <img
            src={item.img}
            alt="postImg"
            height={400}
            width={400}
            className="h-auto max-h-[400px] max-w-[306px] object-contain"
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between items-start gap-x-4 w-full px-4 py-2">
        <div className=" flex  items-center  gap-x-2  w-full">
          <div
            name="like"
            className={`flex justify-center ${
              loading ? "items-start" : "items-center"
            } flex-col gap-y-2`}
          >
            {loading ? (
              <span className=" skeleton h-[35px] w-[35px] rounded-full pr-2"></span>
            ) : (
              <Icon.Heart
                name="like"
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
                          (item) =>
                            item.byUser.toString() === user._id.toString()
                        )
                      ) {
                        ChangeLikes(
                          "add",
                          item._id,
                          item.user.userId,
                          user._id
                        );
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
            )}
            {loading ? (
              <span className="skeleton h-[15px] w-[65px] rounded-lg"></span>
            ) : (
              <span
                name="like"
                className="text-[14px] sm:text-[16px] font-medium whitespace-nowrap"
              >
                {item.interactions && item.interactions.likes.length + " "}{" "}
                likes
              </span>
            )}
          </div>
          <div
            name="comment"
            className="flex justify-center items-center flex-col gap-y-1"
          >
            {!loading && (
              <Icon.MessageCircle
                name="comment"
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
            )}
            {!loading && (
              <span className=" text-[14px]  sm:text-[16px] whitespace-nowrap">
                {item.interactions && item.interactions.comments.length + " "}{" "}
                comments
              </span>
            )}
          </div>
        </div>
        <div className=" self-end">
          {!loading && (
            <span
              name="comments"
              onClick={() => {
                setShowComment(!showComment);
              }}
              className=" underline text-[15px] hover:text-gray-300 cursor-pointer whitespace-nowrap"
            >
              {showComment ? "Hide all comments" : "View all comments"}
            </span>
          )}
        </div>
      </div>
      {showComment && (
        <div className=" w-full py-1  px-2 border-t-[1px] border-white overflow-hidden  bg-teal-700 rounded-md gap-y-2">
          <h1>Comments</h1>
          <div className=" flex flex-col items-start gap-y-[0.3rem] max-h-[220px] overflow-y-auto allComments -">
            {item &&
              item.interactions &&
              item.interactions.comments.map((i, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col justify-between items-start gap-x-1 w-[90%] gap-y-1  p-1 text-[14px] ${
                    idx !== item?.interactions?.comments.length - 1
                      ? "border-b-[1px] border-white"
                      : ""
                  }`}
                >
                  <span className="text-teal-600 bg-white  px-2 rounded-full font-semibold">
                    {i.byUser.userName}
                  </span>
                  <span className=" ml-2 full">{i.comment}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Posts;
