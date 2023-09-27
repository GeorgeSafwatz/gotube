import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/auth-context";

export const useAuth = () => {
  const {
    getUserData,
    signIn,
    signUp,
    userData,
    signWithGoogle,
    logout,
    updateData,
    getUserInfo,
    userInfo,
    getSelectedLink,
    selectedLink,
  } = useContext<AuthContextType | null>(AuthContext) as AuthContextType;
  return {
    getUserData,
    signIn,
    signUp,
    userData,
    signWithGoogle,
    logout,
    updateData,
    getUserInfo,
    userInfo,
    getSelectedLink,
    selectedLink,
  };
};
