import React from "react";

function RecentComments({ data }) {
  return (
    <div className="p-4 flex justify-center items-start flex-col gap-y-3">
      <h1 className="text-white font-semibold text-2xl">Recent Followers</h1>
      <div className="bg-teal-600 w-5/6 p-3 rounded-md h-2/3">
        <div className=" bg-white flex justify-between items-center flex-col gap-y-3 rounded-md p-3">
          {data.map((item, idx) => (
            <div
              className={`bg-white w-full  flex items-center p-1 gap-x-1 ${
                idx !== data.length - 1 ? "border-t-[1px]" : " border-y-[1px]"
              } border-gray-700`}
              key={idx}
            >
              <span className=" font-semibold text-teal-700 text-[14px] leading-none">
                {item.username}
                <span
                  className={`text-gray-600 text-[12px] font-medium leading-none ml-2 `}
                >
                  {item.comment}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentComments;
