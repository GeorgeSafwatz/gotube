import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoginProps } from "./LoginModal";

const SignIn: React.FC<{
  register: UseFormRegister<LoginProps>;
  passwordValidation: object;
  emailValidation: object;
  errors: FieldErrors<LoginProps>;
  isLoading: boolean;
}> = ({ register, passwordValidation, emailValidation, errors, isLoading }) => {
  return (
    <>
      <div className="space-y-2 font-medium ">
        <label htmlFor="email" className="capitalize">
          Email:
          {errors.email && <span className=" text-red-500"> *</span>}
        </label>
        <input
          type="email"
          {...register("email", { ...emailValidation })}
          className="w-full p-2 outline-none placeholder:text-slate-600 dark:placeholder:text-slate-400 border-b-2 border-slate-600 dark:border-slate-400 focus:border-slate-900 dark:focus:border-slate-50 hover:bg-indigo-500/40 active:bg-indigo-500/60 bg-indigo-500/20 rounded-lg rounded-b-none dark:text-white text-black"
          placeholder="Enter your username"
          autoFocus
          readOnly={isLoading}
        />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="space-y-2 font-medium ">
        <label htmlFor="password" className="capitalize">
          {`Password:`}
          {errors.password && <span className=" text-red-500"> *</span>}
        </label>
        <input
          type="password"
          {...register("password", { ...passwordValidation })}
          className="w-full p-2 outline-none placeholder:text-slate-600 dark:placeholder:text-slate-400 border-b-2 border-slate-600 dark:border-slate-400 focus:border-slate-900 dark:focus:border-slate-50 hover:bg-indigo-500/40 active:bg-indigo-500/60 bg-indigo-500/20 rounded-lg rounded-b-none dark:text-white text-black"
          placeholder="Enter your password"
          readOnly={isLoading}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
    </>
  );
};

export default SignIn;
