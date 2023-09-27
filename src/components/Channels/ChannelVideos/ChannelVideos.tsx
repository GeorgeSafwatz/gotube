import { useParams } from "react-router-dom";
import HomeVideos from "../../HomeComponents/homeVideos/HomeVideos";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChannelVideosProps } from "../../../ulti/Props";
import { Fragment, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const ChannelVideos = () => {
  const { channelId } = useParams();
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const isInView = useInView(buttonRef);

  const fetchChannelVideos = async (pageParam: string) => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        channelId: channelId,
        part: "snippet,id",
        order: "date",
        maxResults: "10",
        pageToken: pageParam,
      },
      headers: {
        "X-RapidAPI-Key": "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as ChannelVideosProps;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const {
    data: channelData,
    fetchNextPage,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<ChannelVideosProps, Error>({
    queryKey: ["channel", channelId, "videos"],
    queryFn: ({ pageParam }) => fetchChannelVideos(pageParam),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    getNextPageParam: (
      lastPage: ChannelVideosProps,
      pages: ChannelVideosProps[]
    ) => {
      const pagesNumber =
        +lastPage.pageInfo.totalResults / +lastPage.pageInfo.resultsPerPage;
      if (pages.length < Math.ceil(pagesNumber)) {
        return lastPage.nextPageToken;
      } else {
        undefined;
      }
    },
  });

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && isInView) {
      fetchNextPage();
    }
  }, [isInView]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-3 md:mt-4">
      {isFetching && !isFetchingNextPage && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {channelData?.pages.map((page) => (
        <Fragment key={page.nextPageToken}>
          {page.items.map((item) => {
            return (
              // @ts-ignore
              <HomeVideos
                videoData={{
                  channelId: item.snippet.channelId,
                  channelTitle: item.snippet.title,
                  description: item.snippet.description,
                  id: item.id.videoId,
                  publishTime: item.snippet.publishTime,
                  title: item.snippet.title,
                  url: item.snippet.thumbnails.high.url,
                }}
              />
            );
          })}
        </Fragment>
      ))}
      <button
        ref={buttonRef}
        disabled={isFetchingNextPage || !hasNextPage}
        className="opacity-0"
      ></button>
    </div>
  );
};

export default ChannelVideos;
