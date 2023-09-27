import axios from "axios";
import {
  AddedPlaylists,
  AddedVideos,
  ChannelDetails,
  AddedChannelsInfo,
} from "./Props";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import db from "../main";
import { useAuth } from "./Hooks/useAuth";
import { QueryClient } from "@tanstack/react-query";

type Pathnames = "watchLater" | "likedVideos" | "playlists";

const UseButtonsFn = () => {
  const { userData: authData } = useAuth();

  const copyHandler = (id?: string) => {
    if (id) {
      const url = `${window.location.hostname}/videos/${id}`;
      navigator.clipboard.writeText(url);
    } else {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
    }
  };

  const subscriptionHandler = async (
    subscribe: boolean,
    channelId: string,
    queryClient?: QueryClient
  ) => {
    let ChannelInfo: AddedChannelsInfo | undefined;
    try {
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
      const response = await axios.request(options);
      const data = response.data as ChannelDetails;
      data.items.forEach((e) => {
        ChannelInfo = {
          id: e.id,
          url: e.snippet.thumbnails.high.url,
          title: e.snippet.title,
          description: e.snippet.description,
          subscriberCount: +e.statistics.subscriberCount,
          videoCount: +e.statistics.videoCount,
        };
      });
    } catch (error) {
      return null;
    }
    if (subscribe && authData.uid) {
      await updateDoc(doc(db, "subscriptions", authData.uid), {
        items: arrayUnion(ChannelInfo),
      });
    } else {
      await updateDoc(doc(db, "subscriptions", authData.uid as string), {
        items: arrayRemove(ChannelInfo),
      });
    }
    queryClient?.invalidateQueries(["subscriptions", authData.uid]);
  };

  const addTo = async (
    pathname: Pathnames,
    data: AddedVideos | AddedPlaylists,
    queryClient?: QueryClient
  ) => {
    await updateDoc(doc(db, pathname, authData.uid as string), {
      items: arrayUnion(data),
    });
    if (pathname === "playlists") {
      queryClient?.invalidateQueries(["user", "playlists", authData.uid]);
    }
  };

  const removeFrom = async (
    pathname: Pathnames,
    data: any,
    queryClient?: QueryClient
  ) => {
    await updateDoc(doc(db, pathname, authData.uid as string), {
      items: arrayRemove(data),
    });
    if (pathname === "playlists") {
      queryClient?.invalidateQueries(["user", "playlists", authData.uid]);
    }
  };

  const getDataExist = (
    data: boolean,
    setStateFn: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setStateFn(data);
  };
  return {
    copyHandler,
    subscriptionHandler,
    addTo,
    removeFrom,
    getDataExist,
  };
};

export default UseButtonsFn;
