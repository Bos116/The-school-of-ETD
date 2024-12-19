import React from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase-config"; // Corrected path
import { doc, deleteDoc } from "firebase/firestore";

function Post({ post, isAuth, onDelete }) {
  const deletePost = async () => {
    const postDoc = doc(db, "posts", post.id);
    await deleteDoc(postDoc);
    onDelete(post.id); // Notify parent to remove the post from state
  };

  return (
    <div className="post">
      <div className="postHeader">
        <div className="title">
          <h1>{post.title}</h1>
        </div>
        <div className="deletePost">
          {isAuth && post.Author?.Id === auth.currentUser?.uid && (
            <button onClick={deletePost}>Delete</button>
          )}
        </div>
      </div>
      <div className="postTextContainer">{post.postText}</div>
      <h3>@{post.Author?.name || "Unknown Author"}</h3>
      

      <Link to={`/comment/${post.id}`}>
        <button>View Comments</button>
      </Link>
    </div>
  );
}

export default Post;