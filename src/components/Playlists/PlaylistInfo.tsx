import { NavLink, useParams } from "react-router-dom";
import AddShareButtons from "./PlaylistVideosListButtons";
import { ShareIcon } from "../../assets/icons/icons";
import UseButtonsFn from "../../ulti/UseButtonsFn";
import AddPlaylistButton from "./AddPlaylistButton";
import { PlaylistDetails, PlaylistVideosProps } from "../../ulti/Props";
import useDateConverter from "../../ulti/Hooks/useDateConverter";
import { useEffect, useState } from "react";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import db from "../../main";

const PlaylistInfo: React.FC<{
  data: PlaylistDetails;
  playlistVideos: PlaylistVideosProps[];
}> = ({ data, playlistVideos }) => {
  const [playlistExist, setPlaylistExist] = useState<boolean>(false);
  const { userData: authData } = useAuth();
  const { playlistId } = useParams();

  //play button nav to 1st video in the list by navigate to ={/playlist/playlistId} and pass the playlist as state
  const { copyHandler } = UseButtonsFn();
  const { convertDate } = useDateConverter();

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      const data = await getDoc(doc(db, "playlists", authData.uid));
      return data.data() as PlaylistDetails;
    };
    const response = fetchUserPlaylists();
    response.then((data) => {
      data.items.forEach((i) => {
        if (i.id === playlistId) {
          setPlaylistExist(true);
          return true;
        }
      });
    });
  }, []);

  return (
    <div className="flex flex-col w-full col-span-2 gap-3 p-4 capitalize md:flex-row lg:flex-col rounded-xl bg-gradient-to-b from-indigo-500/60 to-transparent lg:mt-2 h-fit">
      {data.items.map((item) => {
        return (
          <div key={item.id} className="w-full">
            <img
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.title}
              className="w-full md:max-w-sm h-[200px] rounded-lg bg-slate-50 object-cover object-center"
            />
            <div className="flex flex-col w-full gap-3 text-sm">
              <p className="text-xl font-semibold text-white">
                {item.snippet.title}
              </p>
              <div className="flex flex-col gap-2">
                <NavLink
                  to={`/channels/${item.snippet.channelId}`}
                  className="font-medium text-white capitalize"
                >
                  {item.snippet.channelTitle}
                </NavLink>
                <div className="flex flex-row gap-3">
                  <p className="text-slate-50/40">
                    {convertDate(item.snippet.publishedAt)}
                  </p>
                  <p className="text-slate-50/40">
                    {`- ${playlistVideos[0]?.pageInfo.totalResults} Videos`}
                  </p>
                  <p className="text-slate-50/40">{item.snippet.description}</p>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                {authData.auth && (
                  <AddPlaylistButton
                    setPlaylistExist={setPlaylistExist}
                    playlistExist={playlistExist}
                    data={{
                      // @ts-ignore
                      description: item.snippet.description,
                      id: item.id,
                      title: item.snippet.title,
                      url: item.snippet.thumbnails.high.url,
                      vidsNum: playlistVideos[0]?.pageInfo
                        .totalResults as number,
                    }}
                  />
                )}
                <AddShareButtons functionality={copyHandler} title="copy link">
                  <ShareIcon />
                </AddShareButtons>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistInfo;
