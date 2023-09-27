import { NavLink, useParams } from "react-router-dom";
import PlaylistMenubar from "./PlaylistMenubar";
import { PlaylistVideosProps } from "../../ulti/Props";
import useDateConverter from "../../ulti/Hooks/useDateConverter";

const PlaylistVIdeos: React.FC<{
  extra?: string;
  id?: string;
  number?: number;
  title: string;
  channelName: string;
  date?: string;
  pictureURL: string;
  duration?: string;
  views?: string;
  playlistId?: string;
  channelId: string;
  playlistVideos: PlaylistVideosProps;
}> = ({
  number,
  channelName,
  date,
  title,
  pictureURL,
  views,
  id,
  extra,
  playlistId,
  channelId,
  playlistVideos,
}) => {
  const { videoId } = useParams();
  const { convertDate } = useDateConverter();
  return (
    <div key={id} className="relative w-full group h-fit">
      <NavLink
        to={{
          pathname: `/videos/${id}`,
        }}
        state={{ videoId: id, playlistId, playlistVideos }}
        className={`flex flex-row items-center justify-start w-full ${
          extra ? `${extra}` : "h-32"
        } gap-3 px-3 py-2 transition-all duration-150 rounded-xl hover:bg-indigo-50/10 ${
          videoId === id && "bg-indigo-500/20"
        }`}
      >
        <p className="text-sm dark:text-slate-400 text-slate-600">{number}</p>
        <div
          className={`relative h-full overflow-hidden bg-white rounded-lg ${
            extra ? "w-36" : "w-48"
          }`}
        >
          <img
            src={`${pictureURL}`}
            alt={`${title}`}
            className={`object-cover object-center w-full h-full rounded-lg`}
          />
        </div>
        <div className="flex flex-col self-start gap-2">
          <p
            className={`${
              extra ? "" : "text-xl"
            } font-semibold dark:text-white text-slate-900 line-clamp-2`}
          >
            {title}
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-xs font-semibold dark:text-slate-400 text-slate-600">
              {channelName}
            </p>
            {views && (
              <p className="text-xs font-semibold dark:text-slate-400 text-slate-600">
                {views}
              </p>
            )}
            {date && (
              <p className="text-xs font-semibold dark:text-slate-400 text-slate-600">
                {convertDate(date)}
              </p>
            )}
          </div>
        </div>
      </NavLink>
      <PlaylistMenubar
        data={{
          title,
          channelTitle: channelName,
          url: pictureURL,
          description: "",
          id: id as string,
          channelId,
          publishTime: date as string,
        }}
        pathname="watchLater"
        linkName="Add to watch later"
      />
    </div>
  );
};

export default PlaylistVIdeos;
