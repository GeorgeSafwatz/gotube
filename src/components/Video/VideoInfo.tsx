import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ShareIcon } from "../../assets/icons/icons";
import CommentSection from "./CommentSection";
import VideoDescription from "./VideoDescription";
import SubscribeButton from "./SubscribeButton";
import LikeButton from "./LikeButton";
import UseButtonsFn from "../../ulti/UseButtonsFn";
import { AddedVideos, ChannelDetails, VideoInfoProps } from "../../ulti/Props";
import { useQuery } from "@tanstack/react-query";
import { DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import db from "../../main";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumberShort } from "../../ulti/formatNumberFn";

const VideoInfo: React.FC<{
  videoDetails: VideoInfoProps;
  channelId: string;
}> = ({ videoDetails, channelId }) => {
  // use the id to get LikedVideos and subscribed channels
  // if exist send toggle = {true} inside subscribe and like button
  const { videoId } = useParams();
  const { userData: authData } = useAuth();
  const navigate = useNavigate();
  const { copyHandler } = UseButtonsFn();
  const [videoExist, setVideoExist] = useState<boolean>(false);
  const [channelExist, setChannelExist] = useState<boolean>(false);

  const fetchChannelInfo = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/channels",
      params: {
        part: "snippet,statistics",
        id: channelId,
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
  const { data: channelData } = useQuery<ChannelDetails, Error>({
    queryKey: ["channels", channelId],
    queryFn: fetchChannelInfo,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    const fetchVideoChannel = async () => {
      try {
        const response = await getDoc(doc(db, `subscriptions/${authData.uid}`));
        return response.data() as ChannelDetails;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    };
    const channelResponse = fetchVideoChannel();
    channelResponse.then((data) => {
      data.items.forEach((i) => {
        if (i.id === channelId) {
          setChannelExist(true);
          return true;
        } else {
          setChannelExist(false);
        }
      });
    });

    const fetchVideo = async () => {
      try {
        const response = await getDoc(doc(db, `likedVideos/${authData.uid}`));
        return response as DocumentSnapshot<AddedVideos>;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    };
    const videoResponse = fetchVideo();
    videoResponse.then((data) => {
      data.data()?.items.forEach((i) => {
        if (i.id === videoId) {
          setVideoExist(true);
          return true;
        } else {
          setVideoExist(false);
        }
      });
    });
  }, []);
  return (
    <div className="flex flex-col items-start w-full gap-4">
      {videoDetails.items.map((i) => {
        return (
          <div key={i.id} className="w-full space-y-3">
            <p className="text-2xl font-semibold">{i.snippet.title}</p>
            <div className="flex flex-row items-center justify-between w-full gap-4">
              {channelData?.items.map((info) => {
                return (
                  <div
                    key={info.id}
                    className="flex flex-row items-center gap-3 overflow-hidden"
                  >
                    <img
                      src={info.snippet.thumbnails.high.url}
                      alt={i.snippet.channelTitle}
                      className="object-cover object-center w-12 h-12 rounded-full cursor-pointer"
                      onClick={() =>
                        navigate(`/channels/${i.snippet.channelId}/videos`)
                      }
                    />
                    <div className="flex flex-col justify-start gap-1 capitalize h-full">
                      <NavLink
                        to={`/channels/${i.snippet.channelId}/videos`}
                        className="text-lg font-medium text-slate-900 dark:text-slate-50"
                      >
                        {i.snippet.channelTitle}
                      </NavLink>
                      <p className="text-sm text-slate-900/60 dark:text-slate-50/60">
                        {formatNumberShort(+info.statistics.subscriberCount)}{" "}
                        Subscribers
                      </p>
                    </div>
                  </div>
                );
              })}

              {authData.auth && (
                <SubscribeButton
                  channelExist={channelExist}
                  channelId={channelId}
                  setChannelExist={setChannelExist}
                />
              )}
              <div className="flex flex-row gap-2">
                {authData.auth && (
                  <LikeButton
                    videoExist={videoExist}
                    setvideoExist={setVideoExist}
                    data={{
                      // @ts-ignore
                      channelId: i.snippet.channelId,
                      channelTitle: i.snippet.channelTitle,
                      description: i.snippet.description,
                      id: i.id,
                      publishTime: i.snippet.publishedAt,
                      title: i.snippet.title,
                      url: i.snippet.thumbnails.high.url,
                    }}
                  />
                )}
                <button
                  onClick={() => copyHandler()}
                  className="p-3 font-semibold text-white capitalize bg-black rounded-full outline-none hover:bg-slate-800 active:bg-slate-700 dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:active:bg-indigo-500/50"
                >
                  <ShareIcon />
                </button>
              </div>
            </div>
            <VideoDescription videoDetails={videoDetails} />
            <CommentSection commentsNum={i.statistics.commentCount} />
          </div>
        );
      })}
    </div>
  );
};

export default VideoInfo;
