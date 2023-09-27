import { motion } from "framer-motion";
import VideoInfo from "../../components/Video/VideoInfo";
import SuggestionList from "../../components/Video/SuggestionList";
import PlaylistVideos from "../../components/Video/PlaylistVideos";
import { useLocation, useParams } from "react-router-dom";
import { PlaylistVideosProps, VideoInfoProps } from "../../ulti/Props";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactPlayer from "react-player";

interface StateProps {
  playlistId: string;
  videoId: string;
  playlistVideos: PlaylistVideosProps;
}
const VideoPage = () => {
  const variants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };
  const { state } = useLocation() as { state: StateProps };
  const { videoId } = useParams();
  const fetchVideoDetails = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/videos",
      params: {
        part: "contentDetails,snippet,statistics",
        id: videoId,
      },
      headers: {
        "X-RapidAPI-Key": "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as VideoInfoProps;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const { data, isError, isFetching } = useQuery<VideoInfoProps, Error>({
    queryKey: ["videos", videoId],
    queryFn: fetchVideoDetails,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
  });

  return (
    <motion.section
      variants={variants}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ duration: 0.3 }}
      className="md:col-span-7 md:col-start-2 mx-auto w-[95%] lg:grid lg:grid-cols-5 lg:space-x-3 mt-7 md:pl-4 lg:pl-0 sm:flex sm:flex-col items center justify-start mb-28 gap-4"
    >
      {isFetching && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {data &&
        data.items.map((i) => {
          return (
            <>
              <div
                key={i.id}
                className="flex flex-col col-span-3 gap-3 overflow-hidden rounded-xl w-full"
              >
                {
                  // @ts-ignore
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    width="100%"
                    controls={true}
                    pip={true}
                    stopOnUnmount={false}
                  />
                }
                <VideoInfo
                  channelId={i.snippet.channelId}
                  videoDetails={data}
                />
              </div>
              <aside className="flex flex-col w-full col-span-2 gap-2 mt-3 md:mt-0">
                {state && (
                  <PlaylistVideos
                    playlistVideos={state.playlistVideos}
                    playlistId={state.playlistId}
                  />
                )}
                <SuggestionList />
              </aside>
            </>
          );
        })}
    </motion.section>
  );
};

export default VideoPage;
