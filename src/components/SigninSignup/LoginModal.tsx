import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { createPortal } from "react-dom";
import { ModalControls } from "../NavigationCPP/JoinUs";
import { motion } from "framer-motion";
import { AuthError, User } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ulti/Hooks/useAuth";

export interface LoginProps {
  email: string;
  password: string;
  username?: string;
  name?: string;
}
type mode = "login" | "signup";
export const Login: React.FC<{
  controlModal: () => void;
}> = ({ controlModal }) => {
  const [mode, setMode] = useState<mode>("login");
  const clickHandler = () => {
    mode === "login" ? setMode("signup") : setMode("login");
  };

  const navigate = useNavigate();
  const { getUserData, signIn, signUp, signWithGoogle, getUserInfo } =
    useAuth();

  const registerHandler = async (data: LoginProps) => {
    if (mode === "login") {
      const user = await signIn(data);
      if (user) {
        getUserInfo({
          email: data.email,
          password: data.password,
          name: data.name,
          username: data.username,
        });
      }
      return user;
    } else if (mode === "signup") {
      const user = await signUp(data);
      if (user) {
        getUserInfo({
          email: data.email,
          password: data.password,
          name: data.name,
          username: data.username,
        });
      }
      return user;
    }
  };

  const signingSuccessHandler = (data: User) => {
    const uid = data.uid;
    const authToken = data.getIdToken(true);
    getUserData({ uid, authToken });
    setTimeout(() => {
      controlModal();
    }, 3000);
    reset();
    navigate("/");
  };

  const { error, isLoading, isPaused, isSuccess, mutate } = useMutation<
    User,
    AuthError,
    LoginProps
  >(
    (data: LoginProps): Promise<User> => {
      return registerHandler(data) as Promise<User>;
    },
    {
      onSuccess: (data: User) => {
        signingSuccessHandler(data);
      },
    }
  );

  // const {
  //   mutate: googleMutate,
  //   error: googleError,
  //   isLoading: googleLoading,
  //   isPaused: googlePaused,
  //   isSuccess: googleSuccess,
  // } = useMutation<User, AuthError>({
  //   mutationFn: signWithGoogle,
  //   onSuccess: (data: User) => {
  //     signingSuccessHandler(data);
  //   },
  // });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginProps>({ mode: "onTouched", shouldFocusError: true });

  const passedData: SubmitHandler<LoginProps> = (data: LoginProps) => {
    mutate(data as any);
  };

  const emailValidation = {
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Pleasee enter a valid Email",
    },
    required: {
      value: true,
      message: "Please enter an email",
    },
  };

  const usernameValidation = {
    minLength: {
      value: 6,
      message: "Username should be more than 6 character",
    },
    maxLength: {
      value: 16,
      message: "Username should be less than 16 characters",
    },
    required: "Please enter a username",
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordValidation = {
    minLength: {
      value: 6,
      message: "Password is too short",
    },
    maxLength: {
      value: 20,
      message: "Password is too long",
    },
    pattern: {
      value: passwordPattern,
      message: "Please enter a valid password",
    },
    required: {
      value: true,
      message: "Please enter a name",
    },
  };

  const nameValidation = {
    minLength: {
      value: 2,
      message: "Name is too short",
    },
    pattern: {
      value: /^[a-zA-Z]+( [a-zA-Z]+){0,2}$/,
      message: "Please enter a valid name",
    },
    required: {
      value: true,
      message: "Please enter a name",
    },
  };

  const statusMessage = isSuccess
    ? "Login Successful"
    : isPaused
    ? "Waiting for internet connection"
    : error && error.message;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-fit w-4/6 rounded-xl ring-2 ring-indigo-500/20 dark:ring-indigo-500/40 p-4 dark:bg-slate-900 bg-slate-50 space-y-6 z-30"
    >
      <form
        onSubmit={handleSubmit(passedData)}
        className="w-full flex flex-col gap-4 justify-start text-base dark:text-slate-50 text-slate-900"
      >
        <h3
          className={`capitalize text-2xl text-center w-full font-semibold ${
            error ? "text-red-400" : isSuccess && "text-green-400"
          }`}
        >
          {mode === "login" && !isSuccess && !error
            ? "Login"
            : mode === "signup" && !isSuccess && !error
            ? "Sign Up"
            : ""}
          {statusMessage}
        </h3>
        {mode === "login" ? (
          <SignIn
            register={register}
            passwordValidation={passwordValidation}
            emailValidation={emailValidation}
            errors={errors}
            isLoading={isLoading}
          />
        ) : (
          <SignUp
            register={register}
            passwordValidation={passwordValidation}
            usernameValidation={usernameValidation}
            emailValidation={emailValidation}
            nameValidation={nameValidation}
            errors={errors}
            isLoading={isLoading}
          />
        )}
        {/* <button
          type="submit"
          className=" rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 w-1/2 px-4 py-2 capitalize font-medium mx-auto disabled:cursor-not-allowed"
          disabled={isLoading || isPaused || googleLoading || googlePaused}
          onClick={() => googleMutate()}
        >
          {googleLoading ? "Loading..." : "sign with google"}
        </button> */}
        <button
          type="submit"
          disabled={!isValid || isLoading || isPaused}
          className="rounded-full bg-indigo-500 text-slate-50  w-1/2 px-4 py-2 capitalize font-medium mx-auto focus:border-2 focus:border-slate-50 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-slate-600"
        >
          {mode === "login" && !isSuccess && !isLoading ? "Login" : "Sign Up"}
          {isLoading && "Loading..."}
        </button>
      </form>
      <div className="flex flex-col gap-2 justify-center">
        <button
          onClick={clickHandler}
          className="outline-none text-indigo-500 underline-offset-1 underline capitalize"
          disabled={isLoading || isPaused}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
        <button
          onClick={controlModal}
          className="outline-none text-slate-400 underline-offset-1 underline capitalize"
          disabled={isLoading || isPaused}
        >
          close
        </button>
      </div>
    </motion.div>
  );
};

export const Backdrop: React.FC<{ controlModal: () => void }> = ({
  controlModal,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.15,
      }}
      onClick={controlModal}
      className="absolute top-0 left-0 w-full h-full bg-black/50 z-30"
    ></motion.div>
  );
};

const LoginModal: React.FC<{
  controlModal: (options: ModalControls) => void;
}> = ({ controlModal }) => {
  const overlay = document.querySelector("#overlay") as HTMLElement;
  const backdrop = document.querySelector("#backdrop") as HTMLElement;
  return (
    <>
      {createPortal(
        <Backdrop controlModal={() => controlModal("hide")} />,
        backdrop
      )}
      {createPortal(
        <Login controlModal={() => controlModal("hide")} />,
        overlay
      )}
    </>
  );
};
export default LoginModal;
