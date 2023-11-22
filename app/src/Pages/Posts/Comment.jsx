import React from "react";
import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

function Comment(props) {
  const [currentUser, setCurrentUser] = useOutletContext();
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const [comment, setComment] = useState({
    postId: props.postId,
    id: props.id,
    name: props.name,
    email: props.email,
    body: props.body,
  });
  const bodyInput = useRef(props.body);

  function handleEditComment() {
    fetch(`http://localhost:3000/comments/${props.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify({ body: bodyInput.current.value }),
    });
    setComment((prev) => {
      return { ...prev, body: bodyInput.current.value };
    });
    setToggleEditMode(false);
  }

  return (
    <div className="comment-container" key={comment.index}>
      <div>
        <div className="commentId">{comment.id}</div>
        <div className="commentName"> name: {comment.name} </div>
        <div className="commentEmail"> email: {comment.email} </div>
        {!toggleEditMode ? (
          <div className="commentBody"> body: {comment.body} </div>
        ) : (
          <form>
            <label htmlFor="body">body</label>
            <input type="text" name="commentBody" id="body" ref={bodyInput} />
            <button type="button" onClick={handleEditComment}>
              submit
            </button>
          </form>
        )}
      </div>
      <div className="commentButtons">
        <button
          onClick={() => props.handleRemoveComment(comment.index, comment.id)}
        >
          d
        </button>
        {comment.email !== currentUser.email && ( //change this to === when taking into account that other users can see other usere's posts
          <button onClick={() => setToggleEditMode(true)}>e</button>
        )}
      </div>
    </div>
  );
}

export default Comment;
