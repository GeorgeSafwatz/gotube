import {
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useParams,
} from "react-router-dom";
import ChannelInfo from "./ChannelInfo";
import ChannelTabs from "./ChannelTabs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChannelDetails } from "../../ulti/Props";

const Channel = () => {
  const { channelId } = useParams();
  const initialData = useLoaderData() as ChannelDetails;

  const fetchChannelDetails = async () => {
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
  const { data: channelDetails } = useQuery<ChannelDetails, Error>({
    queryKey: ["channels", channelId],
    queryFn: fetchChannelDetails,
    initialData,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <section className="col-span-7 mx-auto col-start-2 w-[95%] mb-28 md:mb-0 mt-4 md:ml-8 relative flex flex-col gap-4">
        <ChannelInfo channelDetails={channelDetails && channelDetails} />
        <div className="sticky top-16 flex flex-row gap-3  border-b-[1px] border-b-slate-50/20  h-fit justify-around md:justify-start z-10">
          <ChannelTabs>videos</ChannelTabs>
          <ChannelTabs>playlists</ChannelTabs>
          <ChannelTabs>about</ChannelTabs>
        </div>
        <Outlet context={channelDetails && channelDetails} />
      </section>
    </>
  );
};

export default Channel;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const fetchChannelDetails = async () => {
      const channelId = params.channelId;
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/channels",
        params: {
          part: "snippet,statistics",
          id: channelId,
        },
        headers: {
          "X-RapidAPI-Key":
            "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
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
    const response = await queryClient.ensureQueryData(["subscribers"], {
      queryFn: fetchChannelDetails,
    });
    return response;
  };
