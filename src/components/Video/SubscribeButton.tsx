import UseButtonsFn from "../../ulti/UseButtonsFn";

const SubscribeButton: React.FC<{
  channelId: string;
  channelExist: boolean;
  setChannelExist: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ channelId, channelExist, setChannelExist }) => {
  const { subscriptionHandler, getDataExist } = UseButtonsFn();
  const clickHandler = () => {
    if (channelExist) {
      subscriptionHandler(false, channelId);
      getDataExist(false, setChannelExist);
    } else if (!channelExist) {
      subscriptionHandler(true, channelId);
      getDataExist(true, setChannelExist);
    }
  };

  return (
    <button
      onClick={clickHandler}
      className={`px-4 py-2 font-semibold transition-all duration-150 ${
        channelExist
          ? "text-black bg-white ring-1 ring-black rounded-full"
          : "text-white capitalize bg-black rounded-full ring-1 ring-slate-50/20 hover:bg-slate-800 active:bg-slate-700 dark:bg-indigo-500/30 dark:hover:bg-indigo-500/40 dark:active:bg-indigo-500/50"
      }  outline-none w-fit `}
    >
      {channelExist ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
