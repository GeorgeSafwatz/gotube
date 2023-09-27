import { useOutletContext, useParams } from "react-router-dom";
import Playlist from "./Playlist";
import { ChannelDetails, PlaylistDetails } from "../../../ulti/Props";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ChannelPlaylist = () => {
  const { channelId } = useParams();
  const channelDetails = useOutletContext() as ChannelDetails;
  const fetchChannelPlaylist = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/playlists",
      params: {
        id: channelDetails.items[0]?.contentDetails.relatedPlaylists.uploads,
        part: "snippet",
      },
      headers: {
        "X-RapidAPI-Key": "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as PlaylistDetails;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const { data: channelPlaylist } = useQuery<PlaylistDetails, Error>({
    queryKey: ["channels", channelId, "playlist"],
    queryFn: fetchChannelPlaylist,
    staleTime: 1000 * 60 * 3,
  });
  return (
    <div className="md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 space-y-4 md:gap-3 lg:gap-3 m-auto w-[95%] ">
      {channelPlaylist &&
        channelPlaylist.items.map((info) => {
          const userPlaylist = {
            description: info.snippet.description,
            id: info.id,
            title: info.snippet.title,
            url: info.snippet.thumbnails.high.url,
            vidsNum: "-",
          };
          return (
            <Playlist
              userPlaylist={userPlaylist}
              linkName="Add to playlist"
              remove={false}
            />
          );
        })}
    </div>
  );
};

export default ChannelPlaylist;
