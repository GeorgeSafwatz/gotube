import { NavLink } from "react-router-dom";
import PlaylistMenubar from "../Playlists/PlaylistMenubar";
import useDateConverter from "../../ulti/Hooks/useDateConverter";
import { PlaylistVideosProps } from "../../ulti/Props";

const PlaylistVIdeos: React.FC<{
  title: string;
  channelName: string;
  date: string;
  pictureURL: string;
  channelId: string;
  videoId: string;
  playlistData?: PlaylistVideosProps;
}> = ({ channelName, date, title, pictureURL, channelId, videoId }) => {
  const { convertDate } = useDateConverter();
  return (
    <div key={videoId} className="relative w-full group my-3">
      <NavLink
        to={{
          pathname: `/videos/${videoId}`,
        }}
        className="flex flex-row items-center justify-start w-full h-fit gap-3 px-3 py-2 transition-all duration-150 rounded-xl hover:bg-slate-900/10 dark:hover:bg-indigo-50/10"
      >
        <img
          src={`${pictureURL}`}
          alt={`${title}`}
          className="object-cover object-center w-44 h-32 rounded-lg"
        />
        <div className="flex flex-col self-start gap-2">
          <p className="text-xl font-semibold dark:text-white text-slate-900 line-clamp-2">
            {title}
          </p>
          <p className="text-xs font-semibold dark:text-slate-400 text-slate-600">
            {channelName}
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-xs font-semibold dark:text-slate-400 text-slate-600">
              {convertDate(date)}
            </p>
          </div>
        </div>
      </NavLink>
      <PlaylistMenubar
        // @ts-ignore
        data={{
          channelId: channelId,
          channelTitle: channelName,
          id: videoId,
          publishTime: date,
          title: title,
          url: pictureURL,
        }}
        linkName="Add to watch later"
        pathname="watchLater"
      />
    </div>
  );
};

export default PlaylistVIdeos;
