import React from "react";
import Auth from "../../components/Auth";
import { UserAuth } from "../../context/AuthContext";

import AppLayout from "../../components/AppLayout";

function Popup() {
  const { isLoggedIn } = UserAuth();

  return (
    <div className="flex flex-col gap-2 w-[800px] h-[600px] bg-white">
      {isLoggedIn ? <AppLayout /> : <Auth />}
    </div>
  );
}
export default Popup;
