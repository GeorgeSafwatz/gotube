import { useQuery } from "@tanstack/react-query";
import Playlist from "../../components/Channels/ChannelPlaylists/Playlist";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import db from "../../main";
import { AddedPlaylists } from "../../ulti/Props";
import { useNavigate } from "react-router-dom";

const UserPlaylists = () => {
  const { userData: authData } = useAuth();
  const navigate = useNavigate();
  const fetchUserPlaylist = async () => {
    const response = await getDoc(doc(db, `playlists/${authData.uid}`));
    return response.data() as AddedPlaylists;
  };
  const { data, isError, isFetching } = useQuery({
    queryKey: ["user", "playlists", authData.uid],
    queryFn: fetchUserPlaylist,
    refetchOnWindowFocus: false,
  });

  return (
    <article className=" ">
      {isFetching && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {data?.items.length === 0 && (
        <p className="mt-10 text-center">
          There is no videos, <br /> Do you want to go{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-400 underline capitalize cursor-pointer underline-offset-1"
          >
            {" "}
            home{" "}
          </span>
        </p>
      )}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto w-[95%] md:w-full gap-3 items-end">
        {data?.items.map((playlist) => {
          return (
            <Playlist
              userPlaylist={playlist}
              linkName="Remove from playlist"
              remove={true}
            />
          );
        })}
      </section>
    </article>
  );
};

export default UserPlaylists;
