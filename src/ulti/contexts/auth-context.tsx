import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError,
  signOut,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useState, useEffect } from "react";
import db from "../../main";

interface userData {
  auth: string;
  uid: string;
}
export interface LoginProps {
  email: string;
  password: string;
  username?: string;
  name?: string;
}
type InputValues = "name" | "password" | "username";
export interface AuthContextType {
  userData: userData;
  userInfo: LoginProps;
  selectedLink: string;
  getUserData: (data: object) => void;
  signIn: (data: LoginProps) => Promise<User | AuthError>;
  signUp: (data: LoginProps) => Promise<User | AuthError>;
  signWithGoogle: () => Promise<User>;
  logout: () => void;
  updateData: (
    input: InputValues,
    newData: string
  ) => Promise<string | undefined>;
  getUserInfo: (data: LoginProps) => void;
  getSelectedLink: (data: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedLink, setSelectedLink] = useState<string>("");
  const [userData, setUserData] = useState<userData>({ auth: "", uid: "" });
  const [userInfo, setUserInfo] = useState<LoginProps>({
    email: "",
    password: "",
    name: "",
    username: "",
  });
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const getSelectedLink = (data: string) => {
    setSelectedLink(data);
  };

  const getUserData = (data: object) => {
    setUserData((prevState) => {
      return { ...(prevState as userData), ...data };
    });
  };

  const getUserInfo = (data: LoginProps) => {
    setUserInfo((prevState) => {
      return { ...(prevState as LoginProps), ...data };
    });
  };

  const signIn = async (data: LoginProps) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return user.user;
    } catch (error) {
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/user-not-found":
          throw new Error("There is no user with that email");
        default:
          throw new Error("Something went wrong");
      }
    }
  };

  const signUp = async (data: LoginProps) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email as string,
        data.password
      );
      if (user) {
        const { email, password, name, username } = data;
        getUserInfo({ email, password, name, username });
        const docRef = doc(db, "users", user.user.uid);
        const watchLaterRef = doc(db, "watchLater", user.user.uid);
        const playlistsRef = doc(db, "playlists", user.user.uid);
        const subscriptionRef = doc(db, "subscriptions", user.user.uid);
        const likedVideosRef = doc(db, "likedVideos", user.user.uid);
        await setDoc(docRef, { name, email, username, password });
        await setDoc(watchLaterRef, { items: [] });
        await setDoc(likedVideosRef, { items: [] });
        await setDoc(playlistsRef, { items: [] });
        await setDoc(subscriptionRef, { items: [] });
      }
      return user.user;
    } catch (error) {
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/email-already-in-use":
          throw new Error("Email already in use");
        default:
          throw new Error("Something went wrong");
      }
    }
  };

  const signWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      if (user) {
        getUserInfo({
          email: user.email as string,
          password: "",
          name: user.displayName as string,
          username: "",
        });
      }
      return user;
    } catch (error) {
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/missing-email":
          throw new Error("Please, enter your email");
        default:
          throw new Error("Something went wrong");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserData({ auth: "", uid: "" });
  };

  const updatePass = async (password: string) => {
    await updateDoc(doc(db, "users", userData.uid), { password });
    await updatePassword(auth.currentUser as User, password);
  };

  const updateName = async (name: string) => {
    await updateDoc(doc(db, "users", userData.uid), { name });
    await updateProfile(auth.currentUser as User, { displayName: name });
  };

  const updateUsername = async (username: string) => {
    await updateDoc(doc(db, "users", userData.uid), { username });
  };

  const updateData = async (input: InputValues, newData: string) => {
    let msg;
    try {
      if (input === "name") {
        await updateName(newData);
        msg = "name";
      } else if (input === "password") {
        await updatePass(newData);
        msg = "password";
      } else if (input === "username") {
        await updateUsername(newData);
        msg = "username";
      }
    } catch (error) {
      throw new Error("Something went wrong try again");
    }
    return msg;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const auth = user.getIdToken();
        const { uid } = user;
        getUserData({ auth, uid });
        localStorage.setItem("uid", uid);
      } else {
        getUserData({ auth: "", uid: "" });
        localStorage.removeItem("uid");
      }
    });
    return unsubscribe;
  }, [auth]);

  const value = {
    userData,
    userInfo,
    selectedLink,
    getUserData,
    signIn,
    signUp,
    signWithGoogle,
    logout,
    updateData,
    getUserInfo,
    getSelectedLink,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
