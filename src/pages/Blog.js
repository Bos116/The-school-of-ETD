import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Link } from "react-router-dom";

function Blog({ isAuth }) {
  const [postLists, setPostList] = useState([]); // State to store all posts
  const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts
  const [users, setUsers] = useState([]); // State for unique authors
  const [selectedUser, setSelectedUser] = useState(""); // Selected user for filtering

  const postsCollectionRef = collection(db, "posts"); // Firestore collection reference

  // Fetch posts from Firestore
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => {
        const postData = doc.data();
        return { ...postData, id: doc.id, commentCount: postData.comments ? postData.comments.length : 0 };
      });

      setPostList(posts); // Store all posts
      setFilteredPosts(posts); // Initially display all posts

      // Extract unique authors
      const uniqueUsers = [...new Set(posts.map((post) => post.Author?.name || "Unknown Author"))];
      setUsers(uniqueUsers);
    };

    getPosts();
  }, [postsCollectionRef]);

  // Delete post function
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);

    // Update local state after deleting the post
    setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id));
    setFilteredPosts((prevFilteredPosts) => prevFilteredPosts.filter((post) => post.id !== id));
  };

  // Filter posts by selected user
  const handleFilterChange = (e) => {
    const user = e.target.value;
    setSelectedUser(user);

    if (user === "") {
      // Show all posts if no user is selected
      setFilteredPosts(postLists);
    } else {
      // Filter posts by the selected user
      const filtered = postLists.filter((post) => post.Author?.name === user);
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="homePage">
      {/* Create Post Button */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button>
          <Link to="/createpost" style={{ textDecoration: "none", color: "inherit", fontSize: "14px" }}>
            Create a Post
          </Link>
        </button>
      </div>

      {/* User Filter Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="userFilter">Filter by User:</label>
        <select
          id="userFilter"
          value={selectedUser}
          onChange={handleFilterChange}
          style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }}
        >
          <option value="">All Users</option>
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      {filteredPosts.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="deletePost">
              {isAuth && post.Author?.Id === auth.currentUser?.uid && (
                <button onClick={() => deletePost(post.id)}>
                  {/* Replace this with a trashcan icon if needed */}
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="postTextContainer">{post.postText}</div>
          <h3 style={{ color: "blue" }}>@{post.Author?.name || "Unknown Author"}</h3>
          {/* Display Comment Count */}
          <p>
            {post.commentCount} {post.commentCount === 1 ? "Comment" : "Comments"}
          </p>

          <Link to={`/comment/${post.id}`}>
            <button>View Comments</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Blog;