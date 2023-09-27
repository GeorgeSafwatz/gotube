import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import db from "../../main";
import { UserData } from "../../components/NavigationCPP/Profile";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { Outlet, useLoaderData } from "react-router-dom";
import ChannelTabs from "../../components/Channels/ChannelTabs";
import UserInfo from "../../components/UserPage/UserInfo";

const UserPage = () => {
  const { userData: authData } = useAuth();
  const initialData = useLoaderData() as UserData | null;

  const fetchUserData = async () => {
    const user = await getDoc(doc(db, `users/${authData.uid}`));
    try {
      return user.data() as UserData;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<UserData, Error>({
    queryKey: ["userData", authData.uid],
    queryFn: fetchUserData,
    initialData: (initialData as UserData) || null,
    refetchOnWindowFocus: false,
    enabled: initialData ? true : false,
  });

  return (
    <div className="col-span-6 col-start-2 md:col-span-7 pb-28 md:pb-0 md:col-start-2 mt-10  whitespace-nowrap text-black dark:text-white w-[95%] mx-auto md:pl-5 lg:pl-0">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {userData && authData.auth && (
        <>
          <UserInfo channelName={userData.name} userName={userData.username} />
          <section className="sticky top-16 flex flex-row gap-3 border-b-[1px] border-b-slate-50/20  h-fit justify-around md:justify-start z-10 dark:bg-slate-900/60 bg-slate-50/60">
            <ChannelTabs>watchLater</ChannelTabs>
            <ChannelTabs>likedVideos</ChannelTabs>
            <ChannelTabs>playlists</ChannelTabs>
            <ChannelTabs>subscriptions</ChannelTabs>
          </section>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default UserPage;
