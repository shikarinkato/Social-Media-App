import React from "react";


function SearchBar({ type, onchange }) {
  return (
    <input
      type={type}
      className="h-10 w-[25vw] rounded-full border-[1px] border-neutral-700 outline-none text-neutral-700 pl-4 text-[20px]"
      onChange={onchange}
    />
  );
}

export default SearchBar;
