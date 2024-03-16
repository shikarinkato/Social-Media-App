import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assests/img/logo.png";
import { ArrowLeftCircle, Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/StateProvider";
function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [emailOruserName, setEmailorUsername] = useState("");
  const { GetIn } = useContext(Context);

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
            <input
              className="border-[1px]  border-teal-800 rounded-full px-2 h-10 w-[20vw] outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="email or username"
              onChange={(e) => setEmailorUsername(e.target.value)}
            />
            <div className="text-teal-700 relative flex justify-center items-center">
              <input
                className="border-[1px]  border-teal-800 rounded-full px-2 h-10 w-[20vw] outline-none"
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
            <button
              onClick={(e) => {
                e.preventDefault();
                GetIn(emailOruserName, password);
              }}
              className="py-2 px-5 rounded-md bg-teal-700 text-white text-2xl font-semibold w-full"
            >
              Log in
            </button>
          </form>
          <div className="text-center mt-2">
            <div className="flex justify-center items-center text-[20px]">
              <span>Don't have a </span>
              <img
                src={Logo}
                alt="logo"
                className="h-[30px] w-[30px] mx-2"
              />{" "}
              <span>Zingaat Account ?</span>
            </div>
            <Link to="/signup" className="text-[18px] underline mt-3">
              signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
