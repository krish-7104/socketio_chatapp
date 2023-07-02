import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import SocketIO from "socket.io-client";
import Message from "./Message";
import AdminMessage from "./AdminMessage";
const ENDPOINT = "http://localhost:4500";
let socket;
const Chat = () => {
  const [id, setId] = useState();
  const [sendmessage, setSendMessage] = useState("");
  const [message, setMessage] = useState([]);
  const router = useLocation();

  const sendMessageHandler = () => {
    if (sendmessage) {
      socket.emit("message", { message: sendmessage, id });
      setSendMessage("");
    }
  };

  useEffect(() => {
    socket = SocketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("sendMessage", (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
    });

    const handleUserJoined = (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
    };

    const handleWelcome = (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
    };

    const handleLeave = (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
    };

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", {
      user: router.state.name,
    });

    socket.on("userJoined", handleUserJoined);
    socket.on("welcome", handleWelcome);
    socket.on("leave", handleLeave);

    return () => {
      socket.disconnect();
      socket.off("userJoined", handleUserJoined);
      socket.off("welcome", handleWelcome);
      socket.off("leave", handleLeave);
    };
  }, [router.state.name]);

  return (
    <section className="bg-indigo-900 h-[100vh] w-[100vw] flex justify-evenly items-center">
      <div className="w-[60%] h-[80%] bg-white rounded shadow-md">
        <div className="w-full h-[90%] p-4 clear-both overflow-y-auto">
          {message &&
            message.map((item, index) => {
              return <Message data={item} name={router.state.name} />;
            })}
        </div>
        <div className="w-full h-[10%] flex justify-between items-center border-t-2 border-indigo-900">
          <input
            type="text"
            onChange={(e) => setSendMessage(e.target.value)}
            value={sendmessage}
            placeholder="Enter Message Here: "
            className="bg-white px-4 font-medium py-2 w-full outline-none border-none"
          />

          <div
            onClick={sendMessageHandler}
            className="w-[80px] h-[100%] border-l-2 border-indigo-900 flex justify-center items-center text-2xl cursor-pointer"
          >
            <AiOutlineSend />
          </div>
        </div>
      </div>
      <div className="w-[24%] h-[80%] bg-white rounded shadow-md">
        <div className="w-full h-[100%] p-4 clear-both overflow-y-auto">
          {message &&
            message.map((item, index) => {
              if (item.user === "Admin") {
                return <AdminMessage data={item} name={router.state.name} />;
              } else {
                return <></>;
              }
            })}
        </div>
      </div>
    </section>
  );
};

export default Chat;
