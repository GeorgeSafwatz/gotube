import { useEffect, useRef } from "react";
import { PlaylistVideosProps } from "../../ulti/Props";
import PlaylistVIdeos from "./PlaylistVIdeos";
import { useInView } from "framer-motion";

const PlaylistVideosList: React.FC<{
  playlistVideos: PlaylistVideosProps[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}> = ({ playlistVideos, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const isInView = useInView(buttonRef);
  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView]);

  return (
    <>
      {playlistVideos.map((playlistVideo, index) => {
        return (
          <div
            key={index}
            className="col-span-3 h-fit p-2 flex flex-col gap-3 "
          >
            {playlistVideo.items.map((item, index) => {
              return (
                <PlaylistVIdeos
                  id={item.snippet.resourceId.videoId}
                  channelName={item.snippet.videoOwnerChannelTitle}
                  date={item.snippet.publishedAt}
                  number={index}
                  pictureURL={item.snippet.thumbnails.high.url}
                  title={item.snippet.title}
                  playlistId={item.snippet.playlistId}
                  channelId={item.snippet.channelId}
                  playlistVideos={playlistVideo}
                />
              );
            })}
          </div>
        );
      })}
      <button
        ref={buttonRef}
        disabled={isFetchingNextPage || !hasNextPage}
        className="opacity-0"
      ></button>
    </>
  );
};

export default PlaylistVideosList;
