import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const onLoginHandler = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/chat", { state: { name: user } });
    }
  };
  return (
    <section className="bg-indigo-900 h-[100vh] w-[100vw] flex justify-center items-center flex-col">
      <h1 className="my-4 text-center font-semibold uppercase text-3xl absolute top-4 tracking-wide text-white">
        Realtime Chat App - SocketIO
      </h1>
      <form
        onClick={onLoginHandler}
        className="w-full mx-auto flex justify-center items-center flex-col"
      >
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter Name Here"
          className="font-medium outline-none p-3 rounded-sm w-[30%]"
        />
        <button
          className="bg-white text-black px-4 font-medium p-3 w-[30%] rounded mt-4"
          type="submit"
        >
          Login To Chat
        </button>
      </form>
    </section>
  );
};

export default Join;
