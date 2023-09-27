import { useQuery } from "@tanstack/react-query";
import SubChannels from "../../components/UserPage/SubChannels";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import db from "../../main";
import { AddedChannels } from "../../ulti/Props";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const { userData: authData } = useAuth();
  const navigate = useNavigate();
  const fetchSubs = async () => {
    try {
      const response = await getDoc(doc(db, `subscriptions/${authData.uid}`));
      return response.data() as AddedChannels;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const { data, isFetching, error } = useQuery<AddedChannels, Error>({
    queryKey: ["subscriptions", authData.uid],
    queryFn: fetchSubs,
    refetchOnWindowFocus: false,
  });
  return (
    <article className="flex flex-col gap-4 mx-auto w-full mt-3">
      {isFetching && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data?.items.length === 0 && (
        <p className="mt-10 text-center">
          There is no videos, <br /> Do you want to go{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-400 underline capitalize cursor-pointer underline-offset-1"
          >
            {" "}
            home{" "}
          </span>
        </p>
      )}
      {data?.items.map((channel) => {
        return (
          <SubChannels
            channelName={channel.title}
            description={channel.description}
            id={channel.id}
            img={channel.url}
            subscribersCount={channel.subscriberCount}
            videoCount={channel.videoCount}
            pathname={"subscriptions"}
          />
        );
      })}
    </article>
  );
};

export default Subscriptions;
