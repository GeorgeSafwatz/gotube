import useDateConverter from "../../ulti/Hooks/useDateConverter";
import { PlaylistVideosProps } from "../../ulti/Props";
import PlaylistVIdeos from "../Playlists/PlaylistVIdeos";

const PlaylistVideosList: React.FC<{
  playlistVideos: PlaylistVideosProps;
  playlistId: string;
}> = ({ playlistVideos, playlistId }) => {
  const { convertDate } = useDateConverter();
  return (
    <div className="flex flex-col gap-2">
      {playlistVideos.items.map((item, index) => {
        return (
          <PlaylistVIdeos
            key={item.id}
            number={index}
            channelName={item.snippet.channelTitle}
            pictureURL={item.snippet.thumbnails.high.url}
            title={item.snippet.title}
            channelId={item.snippet.channelId}
            playlistVideos={playlistVideos}
            date={convertDate(item.snippet.publishedAt)}
            id={item.snippet.resourceId.videoId}
            playlistId={playlistId}
            extra="h-24"
          />
        );
      })}
    </div>
  );
};

export default PlaylistVideosList;
