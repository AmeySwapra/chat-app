import React from "react";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";
const Sidebar = () => {
  return (
    <aside className="border-r border-slate-500 p-4 flex flex-col space-y-4">
      {/* Search Input */}
      <SearchInput />
      
      {/* Divider */}
      <hr className="border-slate-500" />
      
      {/* Conversations */}
      <Conversations />
      
      {/* Logout Button */}
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
