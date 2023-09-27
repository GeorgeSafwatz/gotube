import { doc, getDoc } from "firebase/firestore";
import db from "../../main";
import { useAuth } from "./useAuth";
import { UserData } from "../../components/NavigationCPP/Profile";

const useFetchUser = () => {
  const { userData } = useAuth();
  const fetchUser = async () => {
    const docRef = doc(db, `users/${userData?.uid}`);
    try {
      const user = await getDoc(docRef);
      return user.data() as UserData;
    } catch (error) {
      throw new Error("User isn't found");
    }
  };

  return {
    queryKey: ["userData", userData.uid],
    queryFn: fetchUser,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    select: (data: UserData) => {
      const createPicName = () => {
        const arr = data?.name.split(" ") as Array<string>;
        const newPicName = arr[1]
          ? (arr[0]?.substring(0, 1) as string) + arr[1]?.substring(0, 1)
          : (arr[0]?.substring(0, 1) as string);
        return newPicName.toUpperCase() as string;
      };
      const userData: UserData = {
        name: data?.name as string,
        username: data?.username as string,
        picName: createPicName() as string,
        password: data?.password as string,
      };

      return userData;
    },
  };
};

export default useFetchUser;
