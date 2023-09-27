import { useQuery } from "@tanstack/react-query";
import WatchLaterVideos from "../../components/UserPage/WatchLaterVideos";
import { useAuth } from "../../ulti/Hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import db from "../../main";
import { useNavigate } from "react-router-dom";
import { AddedVideos } from "../../ulti/Props";

const UserVideos: React.FC<{ pathname: string; linkName: string }> = ({
  pathname,
  linkName,
}) => {
  // depending on pathname data.exist if so change the props passed to menubar

  const { userData: authData } = useAuth();
  const navigate = useNavigate();
  const fetchVideos = async () => {
    const data = await getDoc(doc(db, `${pathname}/${authData.uid}`));
    return data.data() as AddedVideos;
  };
  const { data, isFetching } = useQuery<AddedVideos, Error>({
    queryKey: [pathname, authData.uid],
    queryFn: fetchVideos,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col gap-3 mt-3">
      {isFetching && <p>Loading...</p>}
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
      {data?.items &&
        data.items.map((video) => {
          return (
            <WatchLaterVideos
              data={video}
              picutre={video.url && video.url}
              linkName={linkName}
              pathname={pathname}
            />
          );
        })}
    </div>
  );
};

export default UserVideos;
