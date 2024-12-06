import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useImageFetch({ imgURL }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    try {
      if (!imgURL) {
        return toast.error("Image URL is Missing", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover,
          style: { color: "red", fontSize: "18px" },
        });
      } else {
      }
    } catch (error) {}
  }, [imgURL]);
  return <div></div>;
}

export default useImageFetch;
