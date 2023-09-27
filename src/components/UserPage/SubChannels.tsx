import { NavLink } from "react-router-dom";
import UseButtonsFn from "../../ulti/UseButtonsFn";
import { formatNumberShort } from "../../ulti/formatNumberFn";
import { useQueryClient } from "@tanstack/react-query";

const SubChannels: React.FC<{
  id: string;
  channelName: string;
  subscribersCount: number;
  videoCount: number;
  description: string;
  img: string;
  pathname: string;
}> = ({ channelName, description, id, img, subscribersCount, videoCount }) => {
  const { subscriptionHandler } = UseButtonsFn();
  const queryClient = useQueryClient();
  return (
    <section className="flex flex-row text-slate-900 dark:text-slate-50 justify-between w-full items-center p-2 h-fit hover:bg-slate-900/20 dark:hover:bg-slate-50/20 rounded-xl">
      <NavLink to={`/channels/${id}`} className="flex flex-row gap-3">
        <img
          src={img}
          alt="channel-name"
          className="w-20 h-20 rounded-full object-cover object-center bg-white"
        />
        <section className="flex flex-col gap-1 w-full">
          <p className="text-xl  font-semibold text-black dark:text-white mb-2">
            {channelName}
          </p>
          <section className="text-sm text-slate-600 dark:text-slate-400 flex flex-row gap-2 capitalize">
            <p>{formatNumberShort(subscribersCount)} subscribers</p>
            <p>{formatNumberShort(videoCount)} videos</p>
          </section>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 whitespace-normal">
            {description}
          </p>
        </section>
      </NavLink>
      <button
        onClick={() => {
          subscriptionHandler(false, id, queryClient);
        }}
        className="text-white bg-indigo-400 px-4 py-2 font-medium rounded-full h-fit focus:ring-2 ring-white hover:bg-indigo-500 active:bg-indigo-600"
      >
        unsubscribe
      </button>
    </section>
  );
};

export default SubChannels;
