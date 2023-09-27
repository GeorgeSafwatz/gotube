import { useOutletContext } from "react-router-dom";
import ShareIcon from "../../../assets/icons/ShareIcon";
import UseButtonsFn from "../../../ulti/UseButtonsFn";
import { ChannelDetails } from "../../../ulti/Props";
import { formatNumberShort } from "../../../ulti/formatNumberFn";

const ChannelAbout = () => {
  const { copyHandler } = UseButtonsFn();
  const channelDetails = useOutletContext() as ChannelDetails;
  return (
    <>
      {channelDetails.items.map((info) => {
        return (
          <div
            key={info.id}
            className="flex flex-col md:flex-row gap-2 md:justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-indigo-600/40 text-slate-900 dark:text-slate-50"
          >
            <div className="pb-4 md:w-3/5 space-y-2">
              <p className="capitalize text-2xl font-bold">description</p>
              <p className="text-base">{info.snippet.description}</p>
            </div>
            <div className="flex flex-col items-start md:w-2/5 pt-4 md:pt-0 md:pl-10 gap-2">
              <p className="capitalize text-2xl font-bold">stats</p>
              <p className="text-base">
                joind since {info.snippet.publishedAt}
              </p>
              <p className="text-base">
                views count {formatNumberShort(+info.statistics.viewCount)}
              </p>
              <p className="text-base">
                subscribers count{" "}
                {formatNumberShort(+info.statistics.subscriberCount)}
              </p>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-lg capitalize flex flex-row items-center gap-2 mt-2"
                onClick={() => copyHandler()}
              >
                <ShareIcon /> <span>copy link</span>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChannelAbout;
