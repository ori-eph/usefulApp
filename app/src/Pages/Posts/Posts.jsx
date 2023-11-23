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
      <h1 id="postsTitle">Your posts</h1>
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
                <div className="post-header">
                  <img
                    className="profile-picture"
                    src="../../../public/profile.jpg"
                    alt="profile picture"
                  />
                  <div className="poster-info">
                    <div>{currentUser.username} </div>
                    <div>{currentUser.name} </div>
                  </div>
                </div>
                <div className="post-content">
                  <div className="postTitle">{post.title}</div>
                  <div className="postId">{post.id}</div>
                </div>
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
