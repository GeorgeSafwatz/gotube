import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoginProps } from "./LoginModal";

const SignUp: React.FC<{
  register: UseFormRegister<LoginProps>;
  usernameValidation: object;
  passwordValidation: object;
  emailValidation: object;
  nameValidation: object;
  errors: FieldErrors<LoginProps>;
  isLoading: boolean;
}> = ({
  emailValidation,
  passwordValidation,
  register,
  usernameValidation,
  nameValidation,
  errors,
  isLoading,
}) => {
  return (
    <>
      <div className="space-y-2 font-medium ">
        <label htmlFor="email" className="capitalize">
          {`Email: `}
          {errors.email && <span className=" text-red-500"> *</span>}
        </label>
        <input
          type="email"
          {...register("email", { ...emailValidation })}
          className="w-full p-2 outline-none placeholder:text-slate-600 dark:placeholder:text-slate-400 border-b-2 border-slate-600 dark:border-slate-400 focus:border-slate-900 dark:focus:border-slate-50 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-lg rounded-b-none "
          placeholder="Enter your email"
          autoFocus
          readOnly={isLoading}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2 font-medium ">
        <label htmlFor="name" className="capitalize">
          {`Name: `}
          {errors.name && <span className=" text-red-500"> *</span>}
        </label>
        <input
          type="text"
          {...register("name", { ...nameValidation })}
          className="w-full p-2 outline-none placeholder:text-slate-600 dark:placeholder:text-slate-400 border-b-2 border-slate-600 dark:border-slate-400 focus:border-slate-900 dark:focus:border-slate-50 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-lg rounded-b-none "
          placeholder="Enter your full name"
          autoFocus
          readOnly={isLoading}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2 font-medium ">
        <label htmlFor="username" className="capitalize">
          {`Username: `}
          {errors.username && <span className=" text-red-500"> *</span>}
        </label>
        <input
          type="text"
          {...register("username", { ...usernameValidation })}
          className="w-full p-2 outline-none placeholder:text-slate-600 dark:placeholder:text-slate-400 border-b-2 border-slate-600 dark:border-slate-400 focus:border-slate-900 dark:focus:border-slate-50 bg-indigo-500/20 hover:bg-indigo-500/20 rounded-lg rounded-b-none "
          placeholder="Enter your username"
          readOnly={isLoading}
        />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="space-y-2 font-medium ">
        <label htmlFor="password" className="capitalize">
          {`Password: `}
          {errors.password && <span className=" text-red-500"> *</span>}
        </label>
        <input
          type="password"
          {...register("password", { ...passwordValidation })}
          className="w-full p-2 outline-none placeholder:text-slate-600 dark:placeholder:text-slate-400 border-b-2 border-slate-600 dark:border-slate-400 focus:border-slate-900 dark:focus:border-slate-50 bg-indigo-500/20 hover:bg-indigo-500/20 rounded-lg rounded-b-none "
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

export default SignUp;
