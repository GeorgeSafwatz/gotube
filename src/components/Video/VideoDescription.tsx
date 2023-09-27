import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ChannelDetails, VideoInfoProps } from "../../ulti/Props";
import useDateConverter from "../../ulti/Hooks/useDateConverter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const VideoDescription: React.FC<{ videoDetails: VideoInfoProps }> = ({
  videoDetails,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const { convertDate } = useDateConverter();
  const showHandler = () => {
    setShow(!show);
  };
  const { videoId } = useParams();

  const fetchChannelInfo = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/channels",
      params: {
        part: "snippet,statistics",
        id: videoDetails.items[0]?.snippet.channelId,
      },
      headers: {
        "X-RapidAPI-Key": "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as ChannelDetails;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const { data: channelInfo } = useQuery<ChannelDetails, Error>({
    queryKey: ["channels", videoId],
    queryFn: fetchChannelInfo,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
  });

  return (
    <div className="flex flex-col gap-2 w-full p-2 dark:bg-indigo-500/30 bg-slate-300 rounded-lg">
      {videoDetails.items.map((i) => {
        return (
          <>
            <div
              key={i.id}
              className="text-slate-900 gap-2 dark:text-slate-50 before:hidden focus:outline-none list-none text-base flex flex-col w-full"
            >
              <p className="font-medium">
                {i.statistics.viewCount} Views /{" "}
                {convertDate(i.snippet.publishedAt)}
              </p>
              <div className="flex flex-row items-end">
                <p className={`${!show && "line-clamp-2"}`}>
                  {i.snippet.description}{" "}
                </p>
                {!show && (
                  <button
                    onClick={showHandler}
                    className="focus:outline-none underline whitespace-nowrap capitalize"
                  >
                    show more
                  </button>
                )}
              </div>
            </div>
            {show &&
              channelInfo?.items.map((info) => {
                return (
                  <section key={info.id}>
                    <div className="flex flex-row gap-2 my-4">
                      <img
                        src={info.snippet.thumbnails.high.url}
                        alt={i.snippet.channelTitle}
                        className="w-20 h-20 object-cover object-center rounded-full"
                      />
                      <div className="flex flex-col gap-2">
                        <NavLink
                          to={`/channels/${i.snippet.channelId}`}
                          className="text-slate-900 dark:text-slate-50 font-semibold text-xl"
                        >
                          {i.snippet.channelTitle}
                        </NavLink>
                        <p className="capitalize">
                          {info.statistics.subscriberCount} subscribers
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-around text-center font-medium">
                      <NavLink
                        to={`/channels/${i.snippet.channelId}/videos`}
                        className="rounded-full px-4 py-2 text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-700 dark:bg-indigo-500/30 dark:active:bg-indigo-500/50 dark:hover:bg-indigo-500/40 capitalize w-1/3"
                      >
                        videos
                      </NavLink>
                      <NavLink
                        to={`/channels/${i.snippet.channelId}/about`}
                        className="rounded-full px-4 py-2 text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-700 dark:bg-indigo-500/30 dark:active:bg-indigo-500/50 dark:hover:bg-indigo-500/40 capitalize w-1/3"
                      >
                        about
                      </NavLink>
                    </div>
                    <button
                      onClick={showHandler}
                      className="focus:outline-none underline whitespace-nowrap capitalize self-start font-semibold"
                    >
                      show less
                    </button>
                  </section>
                );
              })}
          </>
        );
      })}
    </div>
  );
};

export default VideoDescription;
