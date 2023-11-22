import { useEffect, useState, useEffectEvent } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { handleServerRequest } from "../utils";
// import Post from "./posts/Post";
import "../App.css";

function Posts() {
  const [currentUser, setCurrentUser] = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const response = await handleServerRequest(
        `http://localhost:3000/users/${currentUser.id}/posts`
      );
      if (!response.length) {
        throw new Error("username or password not correct");
      } else {
        const data = await response;
        setPosts(data);
        console.log(data);
      }
    };

    async function handlePosts() {
      setErr(null);
      try {
        getPosts();
      } catch (err) {
        setErr(err);
      } finally {
        // console.log(posts);
      }
    }

    handlePosts();
  }, [currentUser.id]); // Empty dependency array to run only on initial mount

  function handlePostClick(postId) {
    navigate(`${postId}`);
  }
  return (
    <div>
      <div id="posts-container">
        {posts.length ? (
          posts.map((post, index) => {
            return (
              <div
                className="post-container"
                key={index}
                onClick={() => handlePostClick(post.id)}
              >
                <div className="postId">{post.id}</div>
                <div className="postTitle">{post.title}</div>
              </div>
            );
          })
        ) : (
          <span>Loading...</span>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Posts;
