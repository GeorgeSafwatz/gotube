import { VideoCommentsProps } from "../../ulti/Props";
import Comment from "./Comment";

const CommentList: React.FC<{ data: VideoCommentsProps }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      {
        // @ts-ignore
        data && !data.error
          ? data.items.map((i) => {
              return (
                <Comment
                  comment={i.snippet.topLevelComment.snippet.textDisplay}
                  date={i.snippet.topLevelComment.snippet.publishedAt}
                  imgUrl={
                    i.snippet.topLevelComment.snippet
                      .authorProfileImageUrl as string
                  }
                  username={i.snippet.topLevelComment.snippet.authorDisplayName}
                  userId={
                    i.snippet.topLevelComment.snippet.authorChannelId
                      ?.value as string
                  }
                  replies={i.snippet.topLevelComment.totalReplyCount as number}
                  likes={i.snippet.topLevelComment.snippet.likeCount as number}
                />
              );
            })
          : // @ts-ignore
            data.error.code === 403 && (
              <p className="text-2xl text-center text-slate-900 dark:text-slate-50 ">
                Comments have been disabled
              </p>
            )
      }
    </div>
  );
};

export default CommentList;
