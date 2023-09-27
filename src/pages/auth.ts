import { QueryClient } from "@tanstack/react-query";
import { UserData } from "../components/NavigationCPP/Profile";
import { doc, getDoc } from "firebase/firestore";
import db from "../main";

const fetchUser = async (uid: string) => {
  const docRef = doc(db, `users/${uid}`);
  try {
    const user = await getDoc(docRef);
    return user.data() as UserData;
  } catch (error) {
    throw new Error("User isn't found");
  }
};

export const loader = (queryClient: QueryClient) => async () => {
  const uid = localStorage.getItem("uid");
  if (uid) {
    const data = await queryClient.ensureQueryData<UserData, Error>(
      ["userData", uid],
      {
        queryFn: () => fetchUser(uid),
        staleTime: Infinity,
        cacheTime: Infinity,
      }
    );
    return data as UserData;
  } else {
    return null;
  }
};
