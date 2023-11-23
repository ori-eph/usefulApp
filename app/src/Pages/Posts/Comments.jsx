import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { handleServerRequest } from "../../utils";
import { useOutletContext } from "react-router-dom";
import Comment from "./Comment";

function Comments(props) {
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function getComments() {
      const response = await handleServerRequest(
        `http://localhost:3000/posts/${props.postId}/comments`
      );
      //   console.log(
      //     `response: ${JSON.stringify(response)}, length: ${response.length} `
      //   );
      if (!response.length) {
        throw new Error("the post was not found");
      } else {
        const data = await response;
        props.setComments(data);
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
  }, [props.postId]);

  function handleRemoveComment(commentIndex, commentId) {
    fetch(`http://localhost:3000/comments/${commentId}`, { method: "DELETE" });
    props.setComments((prev) =>
      [...prev].filter((item, index) => index !== commentIndex)
    );
  }

  return (
    <div>
      {props.comments.length ? (
        props.comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              index={index}
              name={comment.name}
              email={comment.email}
              body={comment.body}
              handleRemoveComment={handleRemoveComment}
              postId={props.postId}
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
