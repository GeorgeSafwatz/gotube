import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import Close from "../../../assets/icons/Close";
import { useAuth } from "../../../ulti/Hooks/useAuth";
import LoginModal from "../../SigninSignup/LoginModal";
import { useState } from "react";
import { ModalControls } from "../../NavigationCPP/JoinUs";

interface ToggleProps {
  setToggle: React.Dispatch<React.SetStateAction<string>>;
}

const Backdrop: React.FC<ToggleProps> = ({ setToggle }) => {
  const vairants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  return (
    <motion.div
      variants={vairants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        duration: 0.2,
      }}
      onClick={() => setToggle("closed")}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 w-full h-full text-center bg-slate-800/50"
    ></motion.div>
  );
};
const Overlay: React.FC<ToggleProps> = ({ setToggle }) => {
  const variants = {
    hidden: { x: "-100%" },
    shown: { x: "0%" },
  };
  const { userData: authData } = useAuth();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const controlModal = (options?: ModalControls) => {
    options === "show" ? setShowLogin(true) : setShowLogin(false);
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="shown"
      exit="hidden"
      transition={{
        type: "tween",
        duration: 0.3,
      }}
      className="fixed top-0 left-0 z-30 flex flex-col w-60 h-screen gap-4 p-6 dark:bg-slate-800 bg-slate-50 dark:text-slate-50 text-slate-800"
    >
      <div className="flex flex-row items-center justify-between text-xl font-medium">
        <div
          onClick={() => setToggle("closed")}
          className="p-2 rounded-full cursor-pointer hover:bg-slate-50/25"
        >
          <Close />
        </div>
        <NavLink
          to="./"
          onClick={() => {
            setToggle("closed");
          }}
        >
          GoTube
        </NavLink>
      </div>
      {authData.uid ? (
        <p>{`Welcome`}</p>
      ) : (
        <>
          <p
            onClick={() => controlModal("show")}
            className=" px-3 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500 dark:active:bg-indigo-600 capitalize font-medium "
          >
            join us
          </p>
          {showLogin && <LoginModal controlModal={controlModal} />}
        </>
      )}
    </motion.div>
  );
};

const SidebarModal: React.FC<ToggleProps> = ({ setToggle }) => {
  return (
    <div>
      {createPortal(
        <Overlay setToggle={setToggle} />,
        document.getElementById("overlay")!
      )}
      {createPortal(
        <Backdrop setToggle={setToggle} />,
        document.getElementById("backdrop")!
      )}
    </div>
  );
};

export default SidebarModal;
