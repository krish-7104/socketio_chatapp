import React from "react";

const AdminMessage = ({ data }) => {
  return (
    <div className="flex justify-start items-center my-3">
      <p className="text-sm font-medium">{data.message}</p>
    </div>
  );
};

export default AdminMessage;
