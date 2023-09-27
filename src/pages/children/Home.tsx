import { useInfiniteQuery } from "@tanstack/react-query";
import HomeVideos from "../../components/HomeComponents/homeVideos/HomeVideos";
import TagBar from "../../components/HomeComponents/tagBar/TagBar";
import axios from "axios";
import { AddedVideos, SuggestedVideos } from "../../ulti/Props";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useAuth } from "../../ulti/Hooks/useAuth";

const Home = () => {
  const loadingButtonRef = useRef<HTMLButtonElement | null>(null);
  const isInView = useInView(loadingButtonRef);
  const { selectedLink, getSelectedLink } = useAuth();

  const fetchVideos = async (pageParams: string) => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        q: selectedLink || Intl.DateTimeFormat().resolvedOptions().timeZone,
        part: "snippet,id",
        regionCode: "US",
        maxResults: "20",
        order: "date",
        pageToken: pageParams,
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

  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SuggestedVideos, Error>({
    queryKey: ["homeVideos", selectedLink],
    queryFn: ({ pageParam }) => fetchVideos(pageParam),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage: SuggestedVideos, pages: SuggestedVideos[]) => {
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
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView]);
  return (
    <section className="col-span-6 col-start-2 md:col-span-7 md:col-start-2 md:pl-10 sm:pl-0 lg:pl-0 pb-28 md:pb-0">
      <div className="flex flex-col gap-4 w-[96%] m-auto">
        <TagBar selectedLink={selectedLink} getSelectedLink={getSelectedLink} />
        <>
          {isFetching && !isFetchingNextPage && <p>Loading...</p>}
          {data?.pages.map((e, index) => {
            return (
              <div
                className="grid w-full grid-cols-1 justify-center gap-5 mt-3 md:grid-cols-2 md:justify-start md:gap-4 lg:grid-cols-3 lg:gap-4"
                key={index}
              >
                {e.items.map((video) => {
                  const videoData: AddedVideos = {
                    // @ts-ignore
                    channelId: video.snippet.channelId,
                    channelTitle: video.snippet.channelTitle,
                    description: video.snippet.description,
                    publishTime: video.snippet.publishTime,
                    title: video.snippet.title,
                    id: video.id.videoId,
                    url: video.snippet.thumbnails.high.url,
                  };
                  return (
                    // @ts-ignore
                    <HomeVideos videoData={videoData} />
                  );
                })}
              </div>
            );
          })}
          {error && <p>{error.message}</p>}
        </>
        <button
          ref={loadingButtonRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="opacity-0"
        ></button>
      </div>
    </section>
  );
};

export default Home;
