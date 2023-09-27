import { NavLink, useNavigate } from "react-router-dom";
import PlaylistMenubar from "../Playlists/PlaylistMenubar";
type Pathnames = "watchLater" | "likedVideos" | "playlists";
const WatchLaterVideos: React.FC<{
  extra?: string;
  data: {
    id: string;
    url: string;
    publishTime: string;
    channelTitle: string;
    description: string;
    title: string;
    channelId: string;
  };
  linkName: string;
  pathname: string;
  picutre: string;
}> = ({ data, extra, linkName, pathname, picutre }) => {
  const navigate = useNavigate();
  return (
    <div key={data.id} className="relative w-full group">
      <NavLink
        to={{
          pathname: `/videos/${data.id}`,
        }}
        className={`flex flex-row items-center justify-start w-full ${
          extra ? `${extra}` : "h-32"
        } gap-3 px-3 py-2 transition-all duration-150 rounded-xl hover:bg-indigo-50/10 w-full overflow-hidden`}
      >
        <div
          className={`relative h-full overflow-hidden bg-white rounded-lg  ${
            extra ? "w-36" : "w-48"
          }`}
        >
          <img
            src={picutre}
            alt={`${data.title}`}
            className={`object-cover object-center h-full rounded-lg w-44`}
          />
        </div>
        <div className="flex flex-col self-start gap-2 w-full">
          <p
            className={`${
              extra ? "text-lg" : "text-xl"
            } font-semibold dark:text-white text-slate-900 whitespace-pre-wrap line-clamp-2`}
          >
            {data.title}
          </p>
          <div className="flex flex-row gap-2">
            <p
              onClick={() => navigate(`/channels/${data.channelId}`)}
              className="text-xs font-semibold dark:text-slate-400 text-slate-600"
            >
              {data.channelTitle}
            </p>
            {data.publishTime && (
              <p className="text-xs font-semibold dark:text-slate-400 text-slate-600">
                {data.publishTime}
              </p>
            )}
          </div>
          {data.description && (
            <p className="font-semibold dark:text-slate-400 text-slate-600 line-clamp-2 whitespace-pre-wrap">
              {data.description}
            </p>
          )}
        </div>
      </NavLink>

      <PlaylistMenubar
        data={data}
        pathname={pathname as Pathnames}
        remove={true}
        linkName={linkName}
      />
    </div>
  );
};

export default WatchLaterVideos;
