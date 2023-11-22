import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { handleServerRequest } from "../../utils";
// import Post from "./posts/Post";
import "./Posts.css";
import SearchBar from "../../components/SearchBar";

function Posts() {
  const [currentUser, setCurrentUser] = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const [searchRes, setSearchRes] = useState(null);
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
      }
    };

    async function handlePosts() {
      setErr(null);
      try {
        getPosts();
      } catch (err) {
        setErr(err);
      }
    }

    handlePosts();
  }, [currentUser.id]);
  function handlePostClick(postId) {
    navigate(`${postId}`);
  }

  const filteredPosts = searchRes
    ? posts.filter((item) => searchRes.includes(item.id))
    : posts;

  return (
    <div>
      <SearchBar
        searchBy={["title", "id"]}
        category={"posts"}
        setErr={setErr}
        setResList={setSearchRes}
        list={posts}
      />
      {err && <p>{err.message}</p>}
      <div id="posts-container">
        {posts.length ? (
          filteredPosts.map((post, index) => {
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
