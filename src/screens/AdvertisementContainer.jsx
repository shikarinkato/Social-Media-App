import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function AdvertisementContainer() {
  return (
    <div className=" hidden w-1/2 h-full mt-12 px-6 sm:flex  gap-y-8 items-start flex-col fixed -right-[6rem] lg:-right-[11rem] xl:-right-[10rem] 2xl:-right-[15rem] top-[8rem] xl:min-h-screen">
      <div className="w-full h-1/2  flex justify-normal items-center">
        <div className=" h-2/3  xl:h-full w-3/5 xl:w-2/5 bg-gray-400 text-gray-700 flex justify-center items-center">
          {" "}
          <span>Advertisement</span>
        </div>
      </div>
      <div className=" sm:w-2/3 lg:w-1/2 xl:w-2/3 h-[8rem] lg:h-[16rem] xl:h-[8rem] ">
        <Swiper
          spaceBetween={20}
          autoplay={{ delay: 2000 }}
          slidesPerView={1}
          modules={[Autoplay]}
          loop={true}
          className="h-full"
        >
          {Array.from({ length: 5 }).map((item, idx) => (
            <SwiperSlide className="w-full h-full " key={idx}>
              <div
                className="bg-red-600 h-full w-full flex justify-center items-center"
                key={idx}
              >
                Advertisement {idx + 1}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default AdvertisementContainer;
