import { useState } from "react";
import SidebarModal from "./SidebarModal";
import { AnimatePresence } from "framer-motion";
import { Bars } from "../../../assets/icons/icons";

const Menu = () => {
  const [toggle, setToggle] = useState<string>("closed");
  return (
    <div>
      <div
        onClick={() => setToggle("opened")}
        className="p-2 rounded-full cursor-pointer hover:bg-slate-50/25"
      >
        <Bars />
      </div>
      <AnimatePresence>
        {toggle === "opened" && <SidebarModal setToggle={setToggle} />}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
