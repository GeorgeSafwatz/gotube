import { useState } from "react";
import LoginModal from "../SigninSignup/LoginModal";
import { AnimatePresence } from "framer-motion";

export type ModalControls = "show" | "hide";

const JoinUs = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const controlModal = (options?: ModalControls) => {
    options === "show" ? setShowModal(true) : setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={() => controlModal("show")}
        className="rounded-full px-4 py-2 bg-slate-900 text-slate-50 dark:bg-indigo-500 dark:text-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-50/20 font-semibold capitalize text-base dark:hover:bg-indigo-600 dark:active:bg-indigo-700 sm:text-sm md:text-base whitespace-nowrap"
      >
        join us
      </button>
      <AnimatePresence mode="sync">
        {showModal && <LoginModal controlModal={controlModal} />}
      </AnimatePresence>
    </div>
  );
};

export default JoinUs;
