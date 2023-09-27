import { QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import PlaylistInfo from "../../components/Playlists/PlaylistInfo";
import PlaylistVideosList from "../../components/Playlists/PlaylistVideosList";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import { PlaylistDetails, PlaylistVideosProps } from "../../ulti/Props";

const Playlist = () => {
  const { playlistId } = useParams();
  const fetchPlaylist = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/playlists",
      params: {
        id: playlistId,
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
  const initialData = useLoaderData() as PlaylistDetails;
  const { data: playlistInfo } = useQuery<PlaylistDetails, Error>({
    initialData,
    queryKey: ["playlists", playlistId],
    queryFn: fetchPlaylist,
    refetchOnWindowFocus: false,
  });

  const fetchPlaylistVideos = async (pageParam: string) => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/playlistItems",
      params: {
        playlistId: playlistId,
        part: "snippet",
        maxResults: "20",
        pageToken: pageParam,
      },
      headers: {
        "X-RapidAPI-Key": "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as PlaylistVideosProps;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  const {
    data: playlistVideos,
    error,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PlaylistVideosProps, Error>({
    queryKey: ["playlists", "playlistVideos", playlistId],
    queryFn: ({ pageParam }) => fetchPlaylistVideos(pageParam),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    getNextPageParam: (
      lastPage: PlaylistVideosProps,
      pages: PlaylistVideosProps[]
    ) => {
      const pagesNumber =
        +lastPage.pageInfo.totalResults / +lastPage.pageInfo.resultsPerPage;
      if (pages.length < Math.ceil(pagesNumber)) {
        return lastPage.nextPageToken;
      } else {
        return undefined;
      }
    },
  });

  return (
    <section className="w-full col-span-6 col-start-2 px-2 mx-auto md:col-span-7 md:col-start-2 mt-7 mb-28">
      <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 w-[95%] md:pl-2 lg:pl-0 mx-auto">
        {isFetching && <p>Loading...</p>}
        {error && (
          <p className="text-red-600 dark:text-red-400">Somthing went wrong</p>
        )}

        {playlistInfo && playlistVideos && (
          <PlaylistInfo
            data={playlistInfo}
            playlistVideos={playlistVideos?.pages as PlaylistVideosProps[]}
          />
        )}
        {playlistVideos && (
          <PlaylistVideosList
            playlistVideos={playlistVideos?.pages as PlaylistVideosProps[]}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage as boolean}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
    </section>
  );
};

export default Playlist;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const playlistId = params.playlistId;
    const fetchPlaylist = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-v31.p.rapidapi.com/playlists",
        params: {
          id: playlistId,
          part: "snippet",
        },
        headers: {
          "X-RapidAPI-Key":
            "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
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
    const data = await queryClient.ensureQueryData({
      queryKey: ["playlists", playlistId],
      queryFn: fetchPlaylist,
      staleTime: 1000 * 60 * 5,
    });
    return data as PlaylistDetails;
  };
