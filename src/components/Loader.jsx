import React from "react";

const Loader = () => {
  console.log("I'm Loader");
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="loaderCircle"></div>
    </div>
  );
};

export default Loader;
