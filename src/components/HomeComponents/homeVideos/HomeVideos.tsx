import { NavLink } from "react-router-dom";
import PlaylistMenubar from "../../Playlists/PlaylistMenubar";
import useDateConverter from "../../../ulti/Hooks/useDateConverter";
type Pathnames = "watchLater" | "likedVideos" | "playlists";
const HomeVideos: React.FC<{
  linkName?: string;
  pathname?: string;
  extraStyles?: string;
  videoData: {
    id: string;
    url: string;
    publishTime: string;
    channelTitle: string;
    description: string;
    title: string;
    channelId: string;
  };
}> = ({ extraStyles, videoData, linkName, pathname }) => {
  const { convertDate } = useDateConverter();
  return (
    <div
      key={videoData.id}
      className={`flex flex-col rounded-2xl justify-between items-center gap-1 w-full relative ${extraStyles}`}
    >
      <NavLink to={`/videos/${videoData.id}`} className="w-full">
        <img
          src={videoData.url}
          alt={videoData.title}
          className="object-cover object-center w-full h-60 md:h-48 bg-slate-50 dark:bg-slate-200 rounded-xl"
        />
      </NavLink>
      <div className="flex flex-row w-full gap-3 py-2 text-start h-full">
        <div className="flex flex-col gap-3 text-sm whitespace-pre-wrap justify-between">
          <p className="line-clamp-2">{videoData.title}</p>
          <div className="flex flex-col gap-1 text-xs dark:text-slate-400 text-slate-600">
            <NavLink to={`channels/${videoData.channelId}/videos`}>
              {videoData.channelTitle}
            </NavLink>
            {videoData.publishTime && (
              <p>{convertDate(videoData.publishTime)}</p>
            )}
          </div>
        </div>
      </div>
      <PlaylistMenubar
        data={videoData}
        homeVideos={true}
        pathname={(pathname as Pathnames) || "watchLater"}
        linkName={(linkName as string) || "Add to watch later"}
        remove={true}
      />
    </div>
  );
};

export default HomeVideos;
