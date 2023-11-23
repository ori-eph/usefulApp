import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { handleServerRequest } from "../../utils";
import { useOutletContext, useParams } from "react-router-dom";
import Comment from "./Comment";

function Comments({ comments, setComments }) {
  const [err, setErr] = useState(null);
  const { postId } = useParams();
  const setCommentsRef = useRef(setComments);
  setCommentsRef.current = setComments;

  useEffect(() => {
    async function getComments() {
      const response = await handleServerRequest(
        `http://localhost:3000/posts/${postId}/comments`
      );
      //   console.log(
      //     `response: ${JSON.stringify(response)}, length: ${response.length} `
      //   );
      if (!response.length) {
        throw new Error("the post was not found");
      } else {
        const data = await response;
        setCommentsRef.current(data);
      }
    }

    async function handleComment() {
      setErr(null);
      try {
        getComments();
      } catch (err) {
        setErr(err);
      } finally {
        // console.log(post);
      }
    }

    handleComment();
  }, [postId]);

  function handleRemoveComment(commentId) {
    fetch(`http://localhost:3000/comments/${commentId}`, { method: "DELETE" });
    setComments((prev) => [...prev].filter((item) => item.id != commentId));
  }

  return (
    <div>
      {comments.length ? (
        comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              index={index}
              name={comment.name}
              email={comment.email}
              body={comment.body}
              handleRemoveComment={handleRemoveComment}
              postId={postId}
              id={comment.id}
            />
          );
        })
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default Comments;
