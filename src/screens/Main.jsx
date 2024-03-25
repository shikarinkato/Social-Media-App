import React, { useContext, useEffect } from "react";

import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

import { Context } from "../context/StateProvider";
import AdvertisementContainer from "./AdvertisementContainer";

function Main() {
  const { isAuthenticated, setIsAuthenticated, posts } = useContext(Context);

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, setIsAuthenticated]);

  return (
    <div className=" bg-gray-300 h-full w-full">
      <div className="flex items-start justify-start overflow-hidden ">
        <Sidebar />
        <div className="w-full h-full xl:min-h-screen overflow-y-auto  bg-gray-300 relative top-[9rem] xl:top-[8.9rem] 2xl:top-[8.5rem] left-[5%]  lg:left-[30%] xl:left-[25%]  2xl:left-[22%] mb-48 flex justify-between ">
          <div className=" w-[90%] sm:w-3/6 lg:w-2/6 mt-12 px-6  flex justify-start items-start gap-y-6 flex-col">
            <div className="border-b-2 border-gray-600 w-full">
              <h2 className="text-2xl font-semibold text-gray-600">Posts</h2>
            </div>
            <div className=" overflow-y-auto w-full flex justify-start items-start self-start flex-col  gap-y-6 ">
              {posts.length > 0 ? (
                posts.map((item, idx) => <Posts item={item} key={idx} />)
              ) : (
                <div className="h-[35rem]  w-full flex justify-center items-center flex-col text-gray-600">
                  <h1 className="text-[8vw] font-bold opacity-80">(='X'=)</h1>
                  <span className="text-[3vw] font-semibold opacity-80">
                    Sorry we have 0 Posts
                  </span>
                </div>
              )}
            </div>
          </div>
         <AdvertisementContainer/>
        </div>
      </div>
    </div>
  );
}

export default Main;
