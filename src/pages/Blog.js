import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";

function Blog({ isAuth }) {
  const [postLists, setPostList] = useState([]);//use state for postList
  const postsCollectionRef = collection(db, "posts");//defining my db and tables
  //use effect to run all the time to get posts
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [postsCollectionRef]);
  //delete post function
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);

    // Update the local state after deleting
    setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return(
    <div className="homePage">
        <button>
            <Link to="/createpost" style={{ textDecoration: "none", color: "inherit" }}>
                Create a post
            </Link>
        </button>
      {postLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.name?.id === auth.currentUser?.uid && (
                  <button onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            {/* Use optional chaining to avoid errors if author or name is undefined */}
            <h3>@{post.auther?.name || "Unknown Author"}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Blog;