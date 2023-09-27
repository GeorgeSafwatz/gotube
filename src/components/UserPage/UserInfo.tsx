const UserInfo: React.FC<{
  channelName: string;
  userName: string;
}> = ({ channelName, userName }) => {
  const makeAvatar = () => {
    const avatarArr = channelName.split(" ");
    const avatar = ((avatarArr[0]?.charAt(0).toUpperCase() as string) +
      avatarArr[1]?.charAt(0).toUpperCase()) as string;
    return avatar;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-6">
      <div className="flex flex-row justify-start w-full gap-4 items-start">
        <p className="text-3xl font-bold p-4 rounded-full bg-black text-white dark:bg-white dark:text-indigo-400">
          {channelName && makeAvatar()}
        </p>
        <div className="flex flex-col justify-start w-full text-start gap-2">
          <h1 className="text-2xl font-bold">{channelName}</h1>
          <p className="font-bold text-start text-slate-600 dark:text-slate-400">
            {userName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
