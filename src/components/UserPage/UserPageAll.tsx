import { AddedChannels, AddedPlaylists, AddedVideos } from "../../ulti/Props";
import UserPageSections from "./UserPageSections";
import {
  HistoryIcon,
  LikeIcon,
  PlayIcons,
  SubscriptionsIcon,
} from "../../assets/icons/icons";
import { doc, getDoc } from "firebase/firestore";
import db from "../../main";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { QueryClient, useQueries } from "@tanstack/react-query";
import { UserData } from "../NavigationCPP/Profile";
import { useLoaderData } from "react-router-dom";
const UserPageAll = () => {
  const { userData: authData } = useAuth();
  // @ts-ignore
  const userData = useLoaderData() as UserData;
  const fetchUsers = async (feature: string) => {
    const data = await getDoc(doc(db, `${feature}/${authData.uid}`));
    return data.data() as
      | { items: AddedChannels }
      | { items: AddedVideos }
      | { items: AddedPlaylists };
  };
  const queriesResult = useQueries<[][]>({
    queries: [
      {
        queryKey: ["watchLater", authData.uid],
        queryFn: async () => await fetchUsers("watchLater"),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["playlists", authData.uid],
        queryFn: async () => await fetchUsers("playlists"),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["subscriptions", authData.uid],
        queryFn: async () => await fetchUsers("subscriptions"),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["likedVideos", authData.uid],
        queryFn: async () => await fetchUsers("likedVideos"),
        refetchOnWindowFocus: false,
      },
    ],
  });
  const [watchLater, playlists, subscriptions, likedVideos] = queriesResult;

  return (
    <article className="flex flex-col gap-4 w-full mt-3">
      {queriesResult && (
        <>
          <UserPageSections
            content="videos"
            title="Watch Later"
            data={watchLater?.data as AddedVideos}
            to="watchLater"
            icon={<HistoryIcon />}
          />
          <UserPageSections
            content="videos"
            title="Liked Videos"
            data={likedVideos?.data as AddedVideos}
            to="likedVideos"
            icon={<LikeIcon />}
          />
          <UserPageSections
            content="playlists"
            title="Playlists"
            data={playlists?.data as AddedPlaylists}
            to="playlists"
            icon={<PlayIcons />}
          />
          <UserPageSections
            content="subscriptions"
            title="Subscriptions"
            data={subscriptions?.data as AddedChannels}
            to="subscriptions"
            icon={<SubscriptionsIcon />}
          />
        </>
      )}
    </article>
  );
};

export default UserPageAll;

export const loader = (queryClient: QueryClient) => async () => {
  const uid = localStorage.getItem("uid");
  if (uid) {
    const data = await queryClient.ensureQueryData(["userData", uid]);
    return data as UserData;
  }
};
