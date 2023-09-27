import { useNavigate } from "react-router-dom";
import useDateConverter from "../../ulti/Hooks/useDateConverter";

const Comment: React.FC<{
  imgUrl: string;
  username: string;
  date: string;
  comment: string;
  userId: string;
  replies: number;
  likes: number;
}> = ({ comment, date, imgUrl, username, userId, replies, likes }) => {
  const { convertDate } = useDateConverter();
  const navigate = useNavigate();
  return (
    <div key={userId} className="flex flex-row gap-3 items-start justify-start">
      <img
        onClick={() => navigate(`/channels/${userId}`)}
        src={imgUrl}
        alt={username}
        className="w-11 h-11 rounded-full"
      />
      <div className="flex flex-col gap-1 text-sm items-start text-slate-900 dark:text-slate-50">
        <div className="flex flex-row gap-1">
          <p
            onClick={() => navigate(`/channels/${userId}`)}
            className=" font-semibold"
          >
            @{username}
          </p>
          <p className=" text-slate-900/60 dark:text-slate-50/60">
            {convertDate(date)}
          </p>
        </div>
        <p className="">{comment}</p>
        <div className="flex flex-row gap-2"></div>
        {replies && (
          <p className="text-sm dark:text-slate-400 text-slate-600">
            {replies} {replies !== 0 && "replies"}
          </p>
        )}
        <p className="text-sm dark:text-slate-400 text-slate-600">
          {likes} likes
        </p>
      </div>
    </div>
  );
};

export default Comment;
