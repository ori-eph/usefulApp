import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <p>
        we apologize, the page you are trying to reach is available. how about
        you try looking at other parts of our site?
      </p>
      <Link to="/home">Home</Link>
    </div>
  );
}

export default NotFound;
