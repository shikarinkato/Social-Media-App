import { motion, useAnimation } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadCamera from "../assests/img/uploadCamera.png";
import UserIcon from "../assests/img/userIcon.png";
import { Context } from "../context/StateProvider";
import SearchedUser from "./SearchedUser";

function Header() {
  const {
    isAuthenticated,
    user,
    setLoading,
    loading,
    createPost,
    SearchUser,
    searchedUsers,
    userPosts,
    setIsAuthenticated,
  } = useContext(Context);

  const [postImg, setPostImg] = useState("");
  const [caption, setCaption] = useState("");
  const [showUploadModule, setShowUploadModule] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const moduleAnime = useAnimation();
  const moduleBgAnime = useAnimation();
  const drawerAnimation = useAnimation();
  let searchGap = useRef("");
  let timer = useRef(0);

  const postPostPic = async (pics) => {
    setLoading(true);
    try {
      if (pics === undefined) {
        toast.error("Please Select an Image", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      if (!pics || !pics.type.startsWith("image/")) {
        toast.error("Please Upload an Image", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Social-Media-App");
      data.append("cloud_name", "shikarinkato");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/shikarinkato/image/upload/`,
        {
          method: "post",
          body: data,
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Image upload failed.");
      } else {
        const jsonData = await response.json();
        console.log(jsonData);
        setPostImg(jsonData.url.toString());
        toast.success("Picture Uploaded Succesfuly", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      console.error("Error uploading image:", error.message);
    } finally {
      setLoading(false);
    }
  };

  async function handlePostClick(img, interactions, caption) {
    setLoading(true);
    console.log("Handle POst Called");
    try {
      if (!interactions) {
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      } else {
        createPost(postImg, interactions, caption);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setShowUploadModule(false);
      setLoading(false);
    }
  }

  async function handleSearchUser() {
    if (!search) {
      toast.error("Please enter something Here", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      SearchUser(search);
    }
  }

  let filteredUsers = searchedUsers.filter((item) => {
    if (isAuthenticated && user) {
      return item._id !== user._id;
    } else {
      return searchedUsers;
    }
  });

  useEffect(() => {
    const handleAnimation = () => {
      if (showUploadModule === true) {
        moduleAnime.start({ translateY: 0 });
        moduleBgAnime.start({
          display: "flex",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          zIndex: "99",
        });
      } else {
        moduleAnime.start({ translateY: "-180%" });
        moduleBgAnime.start({
          display: "none",
          background: "transparent",
          backdropFilter: "unset",
          position: "absolute",
          zIndex: "-10",
        });
      }
    };

    if (isAuthenticated) {
      handleAnimation();
      if (showDrawer) {
        drawerAnimation.start({ translateX: 0 });
      } else {
        drawerAnimation.start({ translateX: "-100%" });
      }
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [showDrawer, showUploadModule]);

  function scrollHandler() {
    setShowDrawer(false);
  }

  let handleLogoClick = () => {
    if (window.innerWidth >= 1024) navigate("/");
    else {
      setShowDrawer(true);
    }
  };

  function getSearch(e) {
    let date = new Date();
    if (searchGap.current < date.getTime()) {
      searchGap.current = date.getTime() + 400;
      setSearch(e.target.value);
    }
  }

  function handleCaption(e) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setCaption(e.target.value);
    }, 2000);

    return () => {
      clearTimeout(timer.current);
    };
  }

  return (
    <header
      className={
        "p-6 py-6 flex justify-between items-center bg-gray-950 border-b-2 border-teal-700 fixed w-full z-[99] h-36 "
      }
    >
      <section className="flex justify-center items-start flex-col">
        {isAuthenticated ? (
          <>
            <div
              className="sm:border-teal-700 sm:border-4 sm:rounded-full p-1 shadow-xl shadow-gray-700 "
              onClick={handleLogoClick}
            >
              <div className=" sm:h-[70px] sm:w-[70px] sm:rounded-full sm:overflow-hidden shadow-lg cursor-pointer flex justify-center items-center flex-col gap-y-2">
                <img
                  src={user.pic !== "null" ? user.pic : UserIcon}
                  alt="userImg"
                  className=" hidden   sm:flex h-full w-full object-contain"
                />
                <span
                  className={` ${
                    showDrawer && "hidden"
                  } sm:hidden px-4 bg-white  py-[1px]`}
                ></span>
                <span
                  className={` ${
                    showDrawer && "hidden"
                  } sm:hidden px-4 bg-white  py-[1px]`}
                ></span>
                <span
                  className={` ${
                    showDrawer && "hidden"
                  } sm:hidden px-4 bg-white  py-[1px]`}
                ></span>
              </div>
            </div>
            <motion.div
              initial={{ translateX: "-100%" }}
              animate={drawerAnimation}
              transition={{ duration: 1.2, ease: "anticipate", delay: 0.3 }}
              className=" lg:hidden absolute top-0 left-0 w-80 h-screen z-[9999] bg-teal-800 text-white"
            >
              <div className="flex justify-between items-center flex-col gap-y-3 p-3">
                <div className="w-full  border-b-[1px] border-white py-8 relative">
                  <button
                    className=" absolute top-2 right-2"
                    onClick={() => {
                      setShowDrawer(false);
                    }}
                  >
                    <Icon.X size={30} stroke="white" />
                  </button>
                </div>
                <div className="flex justify-center items-center flex-col gap-y-4 w-full ">
                  <div className="flex justify-start items-center w-full gap-x-5 py-3 border-b-[1px] border-white px-4 ">
                    <img
                      src={UserIcon}
                      className=" h-[50px] w-[50px] rounded-full"
                      height={50}
                      width={50}
                      alt="user_profile_pic"
                    />
                    <div className="flex justify-center items-center flex-col">
                      <span className="text-2xl font-semibold">
                        {user.userName}
                      </span>
                      <span className=" underline text-[14px]">
                        {user.name}
                      </span>
                    </div>
                  </div>
                  <div className=" flex justify-between items-center w-full py-5 px-2 border-b-[1px] border-white">
                    <div
                      className=" flex justify-center items-center flex-col cursor-pointer"
                      onClick={() => {
                        navigate("/user/posts");
                      }}
                    >
                      <span>{userPosts.length > 0 ? userPosts.length : 0}</span>
                      <span className=" underline">Posts</span>
                    </div>
                    <div className=" flex justify-center items-center flex-col">
                      <span>
                        {user.followings > 0 ? user.followings.length : 0}
                      </span>
                      <span className=" underline">Followers</span>
                    </div>
                    <div className=" flex justify-center items-center flex-col">
                      {user.followers > 0 ? user.followers.length : 0}
                      <span></span>
                      <span className=" underline">Followings</span>
                    </div>
                  </div>
                  <div className=" w-full mt-3">
                    {" "}
                    <button
                      onClick={() => {
                        setShowUploadModule(true);
                        setShowDrawer(false);
                      }}
                      className=" w-full py-1 px-3 text-2xl font-semibold rounded-md bg-white text-teal-700"
                    >
                      Create New Post
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-4 w-full  flex justify-center items-center flex-col gap-y-4 p-3">
                  <div
                    className="   w-full bg-white text-teal-700 py-1  rounded-md  flex justify-center items-center text-2xl font-semibold gap-x-3 mx-2 cursor-pointer"
                    onClick={() => {
                      navigate("/");
                      setShowDrawer(false);
                    }}
                  >
                    <Icon.Home size={30} stroke="currentcolor" />{" "}
                    <span>Home</span>
                  </div>
                  <div
                    className=" w-full bg-red-600 text-white py-1  rounded-md  flex justify-center items-center text-2xl font-semibold gap-x-3 mx-2 cursor-pointer"
                    onClick={() => {
                      sessionStorage.removeItem("token");
                      sessionStorage.removeItem("user");
                      setIsAuthenticated(false);
                      setShowDrawer(false);
                    }}
                  >
                    <span>Log Out</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <button
            name="login_button"
            onClick={() => navigate("/login")}
            className="bg-teal-600 py-1 px-4 sm:px-8 rounded-md text-white font-semibold text-[18px] sm:text-xl whitespace-nowrap"
          >
            Log in
          </button>
        )}
      </section>
      <div className="flex items-center justify-end sm:justify-between w-5/6 sm:w-2/3 lg:w-1/2">
        <div className="flex gap-x-2  items-center relative">
          <div className=" flex gap-x-2 items-center relative z-[10]">
            <input
              name="user_search_input"
              type="text"
              className="h-10 w-full sm:w-[35vw] lg:w-[25vw] rounded-full border-[1px] border-neutral-700 outline-none text-neutral-700 pl-4 text-[20px]"
              onChange={getSearch}
            />
            <button
              name="search_button"
              className="bg-teal-700 px-3 py-[10px] rounded-e-full absolute -right-1"
              onClick={handleSearchUser}
            >
              <Icon.Search size={20} stroke="#fff" />
            </button>
          </div>
          {searchedUsers.length > 0 ? (
            <div
              className={
                searchedUsers.length <= 0
                  ? "hidden"
                  : " absolute top-12  bg-white   w-full rounded-md p-3"
              }
            >
              {filteredUsers.map((user, idx) => (
                <div key={idx} className="py-1 px-2">
                  <SearchedUser user={user} key={idx} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className=" hidden sm:flex justify-between items-center gap-x-4">
          <Icon.Globe size={25} stroke="white" className=" hidden xl:flex" />
          <Icon.Bell size={25} stroke="white" className=" hidden xl:flex" />
          <button
            onClick={() => {
              if (isAuthenticated) {
                setShowUploadModule(true);
              } else {
                navigate("/login");
              }
            }}
            className="bg-teal-700 py-2 px-4 rounded-md text-white text-[18px] font-medium"
          >
            Create New Post
          </button>
        </div>
      </div>
      {isAuthenticated && showUploadModule && (
        <motion.div
          initial={{ display: "none" }}
          animate={moduleBgAnime}
          transition={{ duration: 1.3, delay: 0.3, ease: "linear" }}
          className="h-screen w-full  justify-center items-center absolute top-[48%] xl:top-1/2 -translate-y-[8.1%] left-1/2 -translate-x-[50%] "
        >
          <motion.div
            initial={{ translateY: "-150%" }}
            animate={moduleAnime}
            transition={{ duration: 1.5, delay: 0.3, ease: "backInOut" }}
            className=" bg-teal-700 rounded-md px-6 py-8 flex justify-between items-start flex-col relative w-5/6 sm:w-1/2"
          >
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setShowUploadModule(false);
              }}
            >
              <Icon.X size={40} stroke="white" />
            </div>
            <div className="w-full  flex  items-center gap-x-4 py-4">
              <div className="h-[60px] w-[60px] rounded-full overflow-hidden">
                <img
                  src={user && user.pic}
                  alt="userimg"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl text-white">
                {user && user.userName}
              </span>
            </div>
            <form className="flex justify-center items-center flex-col gap-y-6 w-full">
              <div className="flex justify-between items-center gap-x-6 w-full sm:flex-row flex-col ">
                <div className=" sm:max-h-[50vh]  flex justify-center items-center py-4 flex-col">
                  {postImg.length > 0 ? (
                    <img
                      src={postImg}
                      alt="postImg"
                      className=" h-auto w-[200px] object-contain p-3"
                    />
                  ) : (
                    <>
                      <label
                        htmlFor="postImg"
                        className=" h-full w-full flex justify-center items-center p-4"
                      >
                        <span className=" flex justify-center items-center rounded-full bg-white p-14 cursor-pointer">
                          <img
                            src={UploadCamera}
                            alt="uploadcamera"
                            className="h-[60px] w-[60px] object-contain"
                          />
                        </span>
                      </label>
                      <input
                        id="postImg"
                        name="postImg"
                        type="file"
                        accept="images/"
                        className="hidden"
                        onChange={(e) => {
                          postPostPic(e.target.files[0]);
                        }}
                      />
                    </>
                  )}
                </div>
                <textarea
                  onChange={handleCaption}
                  type="text"
                  placeholder="#pic , #dp , #viral"
                  className="  outline-none p-1 rounded-md bg-transparent border-[1px] border-white text-white min-h-[20vh] max-h-[50vh] w-full sm:w-1/2"
                />
              </div>
              <div className="flex justify-center items-center w-full">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handlePostClick(
                      postImg,
                      { likes: [], comment: [] },
                      caption
                    );
                  }}
                  disabled={loading ? true : false}
                  className={`bg-white py-1 px-3 rounded-md text-teal-700 font-semibold text-xl w-full`}
                >
                  {loading ? "Loading..." : "Post"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
