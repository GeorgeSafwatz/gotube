import { NavLink } from "react-router-dom";
import PlaylistIcon from "../../../assets/icons/PlaylistIcon";
import PlaylistMenubar from "../../Playlists/PlaylistMenubar";

const Playlist: React.FC<{
  remove: boolean;
  linkName: string;
  userPlaylist: any;
}> = ({ remove, linkName, userPlaylist }) => {
  return (
    <div key={userPlaylist.id} className="relative w-full first:mt-3">
      <NavLink
        to={`/playlists/${userPlaylist.id}`}
        className="flex flex-col items-start justify-center w-full gap-2 pb-1 mt-4 overflow-hidden rounded-2xl"
      >
        <div className="relative w-full">
          <p className="font-semibold p-2 bg-indigo-800/40 flex flex-row gap-2 items-center text-sm absolute bottom-2 w-[95%] right-1/2 translate-x-1/2 md:right-0  md:-translate-x-2  md:w-fit rounded-lg justify-center md:justify-start whitespace-nowrap">
            <PlaylistIcon /> {`- ${userPlaylist.vidsNum} Videos`}
          </p>
          <img
            src={userPlaylist.url}
            alt={userPlaylist.title}
            className="object-cover object-center w-full h-60 md:h-48 lg:h-40 bg-slate-50 dark:bg-slate-200 rounded-xl"
          />
        </div>
        <p className="text-base font-semibold capitalize text-slate-900 dark:text-slate-50">
          {userPlaylist.title}
        </p>
        <p className="text-sm text-gray-400 capitalize cursor-pointer hover:bg-indigo-500/20">
          view full playlist
        </p>
      </NavLink>
      <PlaylistMenubar
        data={{
          description: userPlaylist.description as string,
          id: userPlaylist.id as string,
          title: userPlaylist.title as string,
          url: userPlaylist.url as string,
          vidsNum: userPlaylist.vidsNum as number,
        }}
        pathname="playlists"
        remove={remove}
        homeVideos={true}
        linkName={linkName}
      />
    </div>
  );
};

export default Playlist;
