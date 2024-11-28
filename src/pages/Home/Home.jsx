import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";

const Home = () => {
  return (
    <div
      className="flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <Sidebar />
      <MessageContainer/>
    </div>
  );
};

export default Home;
