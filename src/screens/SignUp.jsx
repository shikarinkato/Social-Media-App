import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assests/img/logo.png";
import { ArrowLeftCircle, Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import UploadCamera from "../assests/img/uploadCamera.png";
import { Context } from "../context/StateProvider";
import { toast } from "react-toastify";

function SignUp() {
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { loading, setLoading, createAccount } = useContext(Context);

  const postProfilePic = async (pics) => {
    setLoading(true);

    if (pics === undefined) {
      toast.error("Please Select an Image", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
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

      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "Social-Media-App");
    data.append("cloud_name", "shikarinkato");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/shikarinkato/image/upload`,
        {
          method: "post",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed.");
      } else {
        const jsonData = await response.json();
        setPic(jsonData.url.toString());
        toast.success("Picture Uploaded Succesfuly", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }

      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen w-full bg-gradient-to-b from-teal-800 via-teal-900 to-teal-950">
      <div className="h-full w-full flex justify-center items-center">
        <div
          className="absolute  left-4 top-3  flex items-center gap-x-4 text-white hover:text-gray-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeftCircle size={50} stroke="currentcolor" strokeWidth={1} />
          <span className="text-2xl font-normal">Home</span>
        </div>
        <div className="bg-white rounded-md flex justify-center gap-y-4 items-start flex-col text-teal-700 py-4 px-6">
          <div className="flex items-center justify-center gap-x-6 w-full">
            <img src={Logo} alt="logo" className="h-[60px] w-[60px]" />
            <h1 className="text-[4vw] font-semibold">Zingaat</h1>
          </div>
          <form className="flex justify-start items-center flex-col gap-y-4">
            <div className="h-[20vh]  flex justify-center items-center py-4">
              {pic.length > 0 ? (
                <img
                  src={pic}
                  alt="postImg"
                  className=" h-[100px] w-[100px] object-contain rounded-full mb-4"
                />
              ) : (
                <>
                  <label
                    htmlFor="postImg"
                    className=" h-full w-full flex justify-center items-center p-4"
                  >
                    <span className=" flex justify-center items-center rounded-full bg-gray-300 p-12 cursor-pointer">
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
                    accept="images/*"
                    className="hidden"
                    onChange={(e) => {
                      postProfilePic(e.target.files[0]);
                    }}
                  />
                </>
              )}
            </div>
            <div className="flex justify-between items-center w-full gap-x-4">
              <input
                className="border-[1px]  border-teal-800 rounded-full px-2 h-10 w-[15vw] outline-none"
                type="text"
                name="name"
                id="name"
                placeholder="full name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border-[1px]  border-teal-800 rounded-full px-2 h-10 w-[15vw] outline-none"
                type="text"
                name="username"
                id="name"
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center w-full gap-x-4">
              <input
                className="border-[1px]  border-teal-800 rounded-full px-2 h-10 w-[15vw] outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-teal-700 relative flex justify-center items-center">
                <input
                  className="border-[1px]  border-teal-800 rounded-full px-2 h-10 w-[15vw] outline-none"
                  type={showPass ? "text" : "password"}
                  name="pass"
                  id="pass"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-2"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <EyeOff size={25} stroke="currentcolor" />
                  ) : (
                    <Eye size={25} stroke="currentcolor" />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full">
              <textarea
                className="border-[1px]  border-teal-800 rounded-xl px-4 py-1 h-20 w-full outline-none"
                type="text"
                name="bio"
                id="bio"
                onChange={(e) => setBio(e.target.value)}
                placeholder="bio"
              />
            </div>
          </form>
          <button
            onClick={() => {
              createAccount(name, username, email, password, bio, pic);
            }}
            disabled={loading ? true : false}
            className="py-2 px-5 rounded-md bg-teal-700 text-white text-2xl font-semibold w-full"
          >
            Sign Up
          </button>
          <div className="text-center mt-2 w-full">
            <div className="flex justify-center items-center text-[20px]">
              <span>create a New </span>
              <img
                src={Logo}
                alt="logo"
                className="h-[30px] w-[30px] mx-2"
              />{" "}
              <span>Zingaat Account ?</span>
            </div>
            <Link to="/login" className="text-[18px] underline mt-3">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
