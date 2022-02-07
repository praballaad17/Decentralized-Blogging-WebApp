import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {

  console.log(post)
  const handleClick = () => {
    console.log("click")
  }

  return (
    <div className="post" onClick={handleClick}>

      {/* <img
        className="postImg"
        src={img}
        alt=""
      /> */}
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to="/post/abc" className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        {post.content}
      </p>
    </div>
  );
}
