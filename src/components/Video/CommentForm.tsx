import { FormEvent, useState } from "react";
import { useAuth } from "../../ulti/Hooks/useAuth";
import LoginModal from "../SigninSignup/LoginModal";
import { ModalControls } from "../NavigationCPP/JoinUs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VideoCommentsProps } from "../../ulti/Props";

const CommentForm: React.FC<{ videoId: string }> = ({ videoId }) => {
  // if logged => comment, else => you should sign in to comment
  const { userData, userInfo } = useAuth();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { getQueryData, setQueryData } = useQueryClient();
  const controlModal = (options?: ModalControls) => {
    options === "show" ? setShowModal(true) : setShowModal(false);
  };

  const addComment = async (data: string) => {
    const comments = (await getQueryData([
      "comments",
      videoId,
    ])) as VideoCommentsProps;
    await setQueryData(
      ["comments", videoId],
      comments.items.push({
        snippet: {
          topLevelComment: {
            snippet: {
              channelId: userData.uid,
              textDisplay: data,
              authorDisplayName: userInfo.name as string,
              publishedAt: new Date().toLocaleDateString(),
            },
          },
        },
      })
    );
  };
  const { mutate } = useMutation({
    mutationFn: (data: string) => addComment(data),
  });
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target) {
      const comment = e.target[0].value as string;
      mutate(comment);
    }
  };

  return (
    <div className="flex flex-row items-start justify-start gap-2 w-full p-2">
      {userData.auth ? (
        <>
          <p className="text-xl">Add Comment</p>
          <form onSubmit={submitHandler} className="w-full">
            <input
              type="text"
              id="comment"
              name="comment"
              required
              placeholder="Add a comment..."
              className="bg-transparent w-full p-2 focus:outline-none border-slate-900/20 focus:border-b-slate-900 dark:focus:border-slate-200 border-b-2 dark:border-slate-50/20"
            />
          </form>
        </>
      ) : (
        <p className="capitalize text-lg">
          please{" "}
          <span
            onClick={() => setShowModal(true)}
            className="text-indigo-600 dark:text-indigo-400 underline underline-offset-1"
          >
            {" "}
            sign in
          </span>{" "}
          to comment
        </p>
      )}
      {showModal && <LoginModal controlModal={controlModal} />}
    </div>
  );
};

export default CommentForm;
