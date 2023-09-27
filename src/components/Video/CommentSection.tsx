import { useQuery } from "@tanstack/react-query";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { VideoCommentsProps } from "../../ulti/Props";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const CommentSection: React.FC<{ commentsNum: string }> = ({ commentsNum }) => {
  const { videoId } = useParams();
  const [showComments, setShowComments] = useState<boolean>(true);
  const commentSRef = useRef<null | HTMLDivElement>(null);
  const isInView = useInView(commentSRef);

  const fetchComments = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/commentThreads",
      params: {
        part: "snippet",
        videoId: videoId,
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as VideoCommentsProps;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const { data, isFetching } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: fetchComments,
    enabled: isInView,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <section
        ref={commentSRef}
        className={`${
          isInView ? "visible" : "invisible"
        } md:flex flex-col gap-5 w-full hidden`}
      >
        {isFetching && <p>Loading comments...</p>}
        {data && (
          <>
            <div className="w-full flex flex-row gap-4 justify-end">
              <p
                onClick={() => setShowComments(!showComments)}
                className="text-xl font-semibold text-end underline capitalize text-indigo-600 dark:text-indigo-400 cursor-pointer"
              >
                {showComments ? "hide comments" : "show comments"}
              </p>
              <p className="text-xl font-semibold text-end">
                {commentsNum} Comments
              </p>
            </div>
            {showComments && (
              <div className="flex flex-col gap-4 w-full">
                <CommentList data={data as VideoCommentsProps} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default CommentSection;
