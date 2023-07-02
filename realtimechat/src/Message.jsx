import React from "react";

const Message = ({ data, name }) => {
  if (data.user === name) {
    return (
      <div className="w-[50%] ml-auto flex justify-end items-center my-1">
        <p className="text-right bg-gray-400 px-4 py-[5px] text-sm inline-block font-medium rounded-l-full rounded-t-full mb-2">
          You : {data.message}
        </p>
      </div>
    );
  } else if (data.user !== "Admin") {
    return (
      <div className="w-[50%] mr-auto flex justify-start items-center my-1">
        <p className="text-left bg-indigo-400 px-4 py-[5px] text-sm inline-block font-medium rounded-r-full rounded-t-full mb-2">
          {data.user} : {data.message}
        </p>
      </div>
    );
  }
};

export default Message;
