import { MouseEvent, useEffect, useRef, useState } from "react";
import PlaylistElipsis from "../../assets/icons/PlaylistElipsis";
import { motion, AnimatePresence } from "framer-motion";
import UseButtonsFn from "../../ulti/UseButtonsFn";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

type Pathnames = "watchLater" | "likedVideos" | "playlists";

const PlaylistMenubar: React.FC<{
  data: {
    id: string;
    url: string;
    publishTime?: string;
    channelTitle?: string;
    description: string;
    title: string;
    channelId?: string;
    vidsNum?: number;
  };
  homeVideos?: boolean;
  pathname: Pathnames;
  remove?: boolean;
  linkName: string;
}> = ({ data, homeVideos, pathname, remove, linkName }) => {
  const { addTo, removeFrom, copyHandler } = UseButtonsFn();
  const { userData: authData } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const queryClient = useQueryClient();
  const variants = {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 100,
    },
  };
  const clickHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    // @ts-ignore
    document.addEventListener("click", handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      ref={ref}
      className={`absolute  z-20 ${
        homeVideos
          ? "right-2 bottom-2"
          : "-translate-y-1/2 top-1/2 right-4 bottom-4"
      }`}
    >
      <PlaylistElipsis
        extra={` ${!homeVideos && "opacity-0 group-hover:opacity-100"} `}
        clickHandler={clickHandler}
      />
      <AnimatePresence mode="popLayout">
        {showDropdown && (
          <motion.div
            variants={variants}
            initial="hide"
            animate="show"
            exit="hide"
            transition={{
              duration: 0.15,
            }}
            className="relative"
          >
            <ul
              className={`flex flex-col rounded-xl p-2 divide-y-2 divide-slate-200 dark:divide-indigo-50/20 bg-slate-900/60 dark:bg-indigo-500/60 text-white text-sm font-medium capitalize absolute ${
                authData.auth ? "-bottom-[70px]" : "-bottom-[20px]"
              }  translate-y-1/2 -left-10 -translate-x-1/2 whitespace-nowrap z-30`}
            >
              {authData.auth && (
                <li
                  onClick={() => {
                    if (remove) {
                      removeFrom(pathname, data, queryClient);
                      queryClient.invalidateQueries([pathname, authData.uid]);
                    } else {
                      // @ts-ignore
                      addTo(pathname, data, queryClient);
                      queryClient.invalidateQueries([pathname, authData.uid]);
                    }
                    setShowDropdown(false);
                  }}
                  className="p-2 rounded-lg rounded-t-none hover:bg-indigo-700/60"
                >
                  {linkName}
                </li>
              )}
              <li
                onClick={() => copyHandler(data.id)}
                className="p-2 rounded-lg rounded-t-none hover:bg-indigo-700/60"
              >
                copy link
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlaylistMenubar;
