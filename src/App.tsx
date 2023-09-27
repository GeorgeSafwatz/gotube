import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorElement from "./pages/Error/ErrorELement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/children/Home";
import Channel, {
  loader as channelLoader,
} from "./components/Channels/Channel";
import ChannelVideos from "./components/Channels/ChannelVideos/ChannelVideos";
import ChannelPlaylist from "./components/Channels/ChannelPlaylists/ChannelPlaylist";
import ChannelAbout from "./components/Channels/ChannelAbout/ChannelAbout";
import Playlist, { loader as playlistLoader } from "./pages/children/Playlist";
import VideoPage from "./pages/children/Video";
import AuthContextProvider from "./ulti/contexts/auth-context";
import { loader as authLoader } from "./pages/auth";
import UserPage from "./pages/children/UserPage";
import { loader as userPageLoader } from "./pages/children/UserPageLoader";
import UserPageAll, {
  loader as UserLoader,
} from "./components/UserPage/UserPageAll";
import WatchLater from "./pages/children/WatchLater";
import LikedVideos from "./pages/children/LikedVideos";
import Subscriptions from "./pages/children/Subscriptions";
import UserPlaylists from "./pages/children/UserPlaylists";

const queryClient = new QueryClient();
function App() {
  // React Router DOM
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorElement />,
      loader: authLoader(queryClient),
      children: [
        { index: true, element: <Home /> },
        {
          path: "playlists/:playlistId",
          element: <Playlist />,
          loader: playlistLoader(queryClient),
        },
        {
          path: "channels/:channelId",
          element: <Channel />,
          loader: channelLoader(queryClient),
          children: [
            { path: "videos", element: <ChannelVideos /> },
            { path: "playlists", element: <ChannelPlaylist /> },
            { path: "about", element: <ChannelAbout /> },
          ],
        },
        { path: "videos/:videoId", element: <VideoPage /> },
        {
          path: "/you",
          element: <UserPage />,
          loader: userPageLoader(queryClient),
          children: [
            {
              index: true,
              element: <UserPageAll />,
              loader: UserLoader(queryClient),
            },
            { path: "watchLater", element: <WatchLater /> },
            { path: "likedVideos", element: <LikedVideos /> },
            { path: "playlists", element: <UserPlaylists /> },
            { path: "subscriptions", element: <Subscriptions /> },
          ],
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
