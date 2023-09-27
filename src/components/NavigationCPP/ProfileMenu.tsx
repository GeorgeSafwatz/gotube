import { motion, Variants } from "framer-motion";
import { createPortal } from "react-dom";
import { ProfileBrief, UserData } from "./Profile";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";

type InputValues = "name" | "password" | "username";

export const Overlay: React.FC<{
  variants: Variants;
  userData: UserData;
  refetch: () => void;
}> = ({ variants, userData, refetch }) => {
  const [input, setInput] = useState<InputValues | null>();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const nameInputRef = useRef<null | HTMLInputElement>(null);
  const usernameInputRef = useRef<null | HTMLInputElement>(null);
  const passwordInputRef = useRef<null | HTMLInputElement>(null);
  const { logout, updateData } = useAuth();

  const { data, error, isSuccess, isLoading, mutate } = useMutation<
    string,
    AuthError,
    string
  >({
    mutationFn: async (data: string): Promise<string> => {
      return updateData(input as InputValues, data) as Promise<string>;
    },
    onSuccess: () => {
      setInput(null);
      setShowMessage(true);
      refetch();
    },
  });
  const confirmHandler = () => {
    switch (input) {
      case "name":
        if (nameInputRef.current) {
          mutate(nameInputRef.current.value);
        }
        break;
      case "password":
        if (passwordInputRef.current) {
          mutate(passwordInputRef.current.value);
        }
        break;
      case "username":
        if (usernameInputRef.current) {
          mutate(usernameInputRef.current.value);
        }
        break;

      default:
        break;
    }
  };
  const changeHandler = (fieldType: InputValues) => {
    if (fieldType === input) {
      setInput(null);
      switch (input) {
        case "name":
          if (nameInputRef.current) {
            nameInputRef.current.value = userData.name;
          }
          break;
        case "password":
          if (passwordInputRef.current) {
            passwordInputRef.current.value = userData.password;
          }
          break;
        case "username":
          if (usernameInputRef.current) {
            usernameInputRef.current.value = userData.username;
          }
          break;
        default:
          break;
      }
    } else {
      setInput(fieldType);
    }
  };

  const message = isLoading
    ? "Changing..."
    : isSuccess
    ? `Your ${data} has been changed!`
    : error && error.message;

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, [showMessage]);

  return (
    <motion.div
      variants={variants}
      initial="hide"
      animate="show"
      exit="hide"
      transition={{
        duration: 0.2,
      }}
      className="fixed z-40 flex flex-col items-center justify-between w-3/6 gap-5 p-6 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 ring-2 ring-slate-400 dark:bg-slate-800 h-4/6 rounded-xl"
    >
      <div className="flex flex-row gap-3">
        <ProfileBrief
          name={userData.name}
          picName={userData.picName}
          username={userData.username}
          imgSize="text-3xl"
          textSize="text-xl"
        />
      </div>
      {showMessage && (
        <div
          className={` p-3 w-[95%] text-xl rounded-lg text-center
      ${
        isLoading &&
        "border-2 border-indigo-400 text-indigo-400 bg-indigo-400/20"
      }
      ${isSuccess && "border-2 border-green-400 text-green-400 bg-green-400/20"}
      ${error && "border-2 border-red-400 text-red-400 bg-red-400/20"}
      `}
        >
          {message}
        </div>
      )}
      <div className="flex flex-col self-start gap-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <label
              htmlFor="name"
              className="text-black capitalize dark:text-white"
            >
              name:
            </label>
            <input
              type="text"
              defaultValue={userData.name}
              id="name"
              ref={nameInputRef}
              required
              minLength={6}
              pattern="/^[a-zA-Z]+( [a-zA-Z]+){0,2}$/"
              autoFocus={input === "name"}
              readOnly={!(input === "name")}
              className={`focus:outline-none dark:text-white rounded-lg text-indigo-600 bg-transparent px-2 py-1 ${
                input === "name" && "ring-2 focus:ring-white ring-white/40"
              }`}
            />
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => changeHandler("name")}
              className={` ${
                input === "name"
                  ? "text-white"
                  : "text-indigo-400 underline-offset-1 underline"
              } capitalize `}
            >
              {input === "name" ? "cancel" : "change"}
            </button>
            {input === "name" && (
              <button
                onClick={confirmHandler}
                className="text-indigo-400 underline capitalize underline-offset-1"
              >
                confirm
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <label
              htmlFor="username"
              className="text-black capitalize dark:text-white"
            >
              username:
            </label>
            <input
              type="text"
              defaultValue={userData.username}
              id="username"
              ref={usernameInputRef}
              required
              minLength={6}
              maxLength={26}
              autoFocus={input === "username"}
              readOnly={!(input === "username")}
              className={`focus:outline-none dark:text-white rounded-lg text-indigo-600 bg-transparent px-2 py-1 ${
                input === "username" && "ring-2 focus:ring-white ring-white/40"
              }`}
            />
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => changeHandler("username")}
              className={` ${
                input === "username"
                  ? "text-white"
                  : "text-indigo-400 underline-offset-1 underline"
              } capitalize `}
            >
              {input === "username" ? "cancel" : "change"}
            </button>
            {input === "username" && (
              <button
                onClick={confirmHandler}
                className="text-indigo-400 underline capitalize underline-offset-1"
              >
                confirm
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <label
              htmlFor="password"
              className="text-black capitalize dark:text-white"
            >
              password:
            </label>
            <input
              type="password"
              defaultValue={userData.name}
              id="password"
              ref={passwordInputRef}
              required
              minLength={6}
              pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"
              autoFocus={input === "password"}
              readOnly={!(input === "password")}
              className={`focus:outline-none dark:text-white rounded-lg text-indigo-600 bg-transparent px-2 py-1 ${
                input === "password" && "ring-2 focus:ring-white ring-white/40"
              }`}
            />
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => changeHandler("password")}
              className={` ${
                input === "password"
                  ? "text-white"
                  : "text-indigo-400 underline-offset-1 underline"
              } capitalize `}
            >
              {input === "password" ? "cancel" : "change"}
            </button>
            {input === "password" && (
              <button
                onClick={confirmHandler}
                className="text-indigo-400 underline capitalize underline-offset-1"
              >
                confirm
              </button>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={logout}
        className="dark:bg-indigo-400 dark:hover:bg-indigo-500 dark:active:bg-indigo-600 bg-black hover:bg-slate-800 active:bg-slate-700 focus:ring-2 ring-blue-400  text-white p-2 rounded-lg capitalize font-medium"
      >
        logout
      </button>
    </motion.div>
  );
};
export const Backdrop: React.FC<{
  variants: Variants;
  toggleIt: () => void;
}> = ({ variants, toggleIt }) => {
  return (
    <motion.div
      variants={variants}
      initial="hide"
      animate="show"
      exit="hide"
      transition={{
        duration: 0.15,
      }}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 w-full h-full bg-slate-900/50"
      onClick={toggleIt}
    ></motion.div>
  );
};

const ProfileMenu: React.FC<{
  variants?: Variants;
  toggleIt: () => void;
  userData?: UserData;
  refetch?: () => void;
}> = ({ variants, toggleIt, userData, refetch }) => {
  const overlay = document.querySelector("#overlay") as HTMLElement;
  const backdrop = document.querySelector("#backdrop") as HTMLElement;
  return (
    <>
      {createPortal(
        <Overlay variants={variants} userData={userData} refetch={refetch} />,
        overlay
      )}
      {createPortal(
        <Backdrop variants={variants} toggleIt={toggleIt} />,
        backdrop
      )}
    </>
  );
};

export default ProfileMenu;
