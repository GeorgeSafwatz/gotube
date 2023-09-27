import { NavLink, useParams } from "react-router-dom";
import SubscribeButton from "../Video/SubscribeButton";
import { AddedChannels, ChannelDetails } from "../../ulti/Props";
import { doc, getDoc } from "firebase/firestore";
import db from "../../main";
import { Fragment, useEffect, useState } from "react";
import { formatNumberShort } from "../../ulti/formatNumberFn";
import { useAuth } from "../../ulti/Hooks/useAuth";
const ChannelInfo: React.FC<{ channelDetails: ChannelDetails }> = ({
  channelDetails,
}) => {
  const [channelExist, setChannelExist] = useState<boolean>(false);
  const { channelId } = useParams();
  const { userData: authData } = useAuth();

  useEffect(() => {
    const fetchUserSubs = async () => {
      try {
        const response = await getDoc(doc(db, `subscriptions/${authData.uid}`));
        return response.data() as AddedChannels;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    };
    const data = fetchUserSubs();
    data.then((res) => {
      res.items.forEach((item) => {
        if (item.id === channelId) {
          setChannelExist(true);
          return true;
        }
      });
    });
  }, []);

  return (
    <Fragment>
      {channelDetails.items.map((info) => {
        return (
          <div
            key={info.id}
            className={`flex flex-col items-center justify-center gap-4 ${
              !info.brandingSettings.image && "mt-5"
            }`}
          >
            {info.brandingSettings.image && (
              <img
                src={info.brandingSettings.image.bannerExternalUrl}
                alt={`${info.snippet.title} Cover`}
                className="object-cover object-center w-full h-40 rounded-t-none bg-slate-50 rounded-xl"
              />
            )}
            <div className="flex flex-row justify-start w-full gap-4 text-black dark:text-white">
              <img
                src={info.snippet.thumbnails.high.url}
                alt={info.snippet.title}
                className="w-20 h-20 rounded-full"
              />
              <div className="flex flex-col justify-start w-full gap-2 text-start text-slate-600 dark:text-slate-400">
                <h1 className="text-3xl font-bold text-white">
                  {info.snippet.title}
                </h1>
                <div className="flex flex-row justify-start gap-1">
                  <p className="text-sm text-indigo-600 underline dark:text-indigo-400 underline-offset-1">
                    {info.snippet.customUrl}
                  </p>{" "}
                  /
                  <p className="text-sm text-slate-600 dark:text-slate-400">{`${formatNumberShort(
                    +info.statistics.subscriberCount
                  )} Subscribers`}</p>{" "}
                  /
                  <p className="text-sm text-slate-600 dark:text-slate-400">{`${info.statistics.videoCount} Videos`}</p>
                </div>
                <NavLink
                  to="about"
                  className="text-sm text-slate-600 dark:text-slate-400"
                >
                  {info.snippet.description}
                </NavLink>
                {authData.auth && (
                  <SubscribeButton
                    channelExist={channelExist}
                    setChannelExist={setChannelExist}
                    channelId={info.id}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ChannelInfo;
