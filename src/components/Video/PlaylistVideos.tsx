import { PlaylistVideosProps } from "../../ulti/Props";
import PlaylistVideosList from "./PlaylistVideosList";

const PlaylistVideos: React.FC<{
  playlistVideos: PlaylistVideosProps;
  playlistId: string;
}> = ({ playlistVideos, playlistId }) => {
  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-scroll overflow-x-hidden text-white bg-indigo-100 rounded-lg dark:bg-indigo-500/10 ring-1 ring-offset-indigo-500/20 h-96 scroll-m-0">
      <p className="flex flex-row justify-between w-full text-sm font-medium capitalize">
        <span>{playlistVideos?.items[0]?.snippet.channelTitle}</span>
        <span className="text-slate-600 dark:text-indigo-500/80 ">
          {`${playlistVideos.items.length} Videos`}
        </span>
      </p>
      {playlistVideos && (
        <PlaylistVideosList
          playlistVideos={playlistVideos}
          playlistId={playlistId}
        />
      )}
    </div>
  );
};

export default PlaylistVideos;
