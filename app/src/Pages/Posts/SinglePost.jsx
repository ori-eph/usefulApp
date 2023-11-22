import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleServerRequest } from "../../utils";
import Comments from "./Comments";

function SinglePost() {
  const [toggleComments, setToggleComments] = useState(false);
  const [post, setPost] = useState({});
  const [err, setErr] = useState(null);

  const { postId } = useParams();

  useEffect(() => {
    async function getPost() {
      const response = await handleServerRequest(
        `http://localhost:3000/posts/${postId}`
      );
      //   console.log(
      //     `response: ${JSON.stringify(response)}, length: ${response.length} `
      //   );
      if (!JSON.stringify(response).length) {
        throw new Error("the post was not found");
      } else {
        const data = await response;
        setPost(data);
      }
    }

    async function handlePost() {
      setErr(null);
      try {
        getPost();
      } catch (err) {
        setErr(err);
      } finally {
        // console.log(post);
      }
    }

    handlePost();
  }, [postId]);

  return (
    <>
      <div className="post-container">
        <div>id: {post?.id}</div>
        <div>title: {post?.title} </div>
        <div>body: {post.body} </div>
      </div>
      {toggleComments && <Comments postId={postId} />}
      <button onClick={() => setToggleComments((prev) => !prev)}>
        {!toggleComments ? "Comments" : "hide comments"}
      </button>
    </>
  );
}

export default SinglePost;
