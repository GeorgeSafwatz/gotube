import { useQuery } from "@tanstack/react-query";
import SuggestedVideo from "./SuggestedVideo";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SuggestedVideos } from "../../ulti/Props";

const SuggestionList = () => {
  const { videoId } = useParams();

  const fetchSuggestions = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        relatedToVideoId: videoId,
        part: "id,snippet",
        type: "video",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as SuggestedVideos;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const { data: suggestedVideos } = useQuery<SuggestedVideos, Error>({
    queryKey: ["suggestedVideos", videoId],
    queryFn: fetchSuggestions,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="capitalize text-xl text-slate-900 dark:text-slate-50 font-semibold">
        suggested videos
      </h3>
      {suggestedVideos &&
        suggestedVideos.items.map((video) => {
          return (
            <SuggestedVideo
              channelName={video.snippet.channelTitle}
              date={video.snippet.publishTime}
              pictureURL={
                video.snippet.thumbnails.high &&
                video.snippet.thumbnails.high.url
              }
              title={video.snippet.title}
              channelId={video.snippet.channelId}
              videoId={video.id.videoId}
            />
          );
        })}
    </div>
  );
};

export default SuggestionList;
