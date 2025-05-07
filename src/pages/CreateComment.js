import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { db, auth } from "../firebase-config";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

function CommentPage() {
  const { postId } = useParams(); // Get postId from URL parameters
  const [post, setPost] = useState(null); // State to hold post data
  const [comment, setComment] = useState(""); // State to hold new comment
  const navigate = useNavigate();

  // Fetch the post from Firestore when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, "posts", postId);
        const postSnapshot = await getDoc(postDoc);

        if (postSnapshot.exists()) {
          setPost(postSnapshot.data()); // Set post data in state
        } else {
          navigate("/blog"); // If post doesn't exist, navigate back to blog
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/blog"); // If error occurs, navigate back to blog
      }
    };

    fetchPost();
  }, [postId, navigate]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      try {
        const postDoc = doc(db, "posts", postId);

        // Add new comment to post's comments array
        await updateDoc(postDoc, {
          comments: arrayUnion({
            text: comment,
            author: auth.currentUser.displayName, // Use current user’s display name
            timestamp: new Date(),
          }),
        });

        setComment(""); // Clear comment input after submission
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  // If post data is loading, show a loading message
  if (!post) return <div>Loading...</div>;

  return (
    <div className="commentPage">
      <h1>{post.title}</h1>
      <p>{post.postText}</p>

      {/* Display Comments above the Leave a Comment section */}
      <div>
        <h3>Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.author}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* Leave a Comment Section */}
      <div className="leaveComment">
        <h3>Leave a Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
}

export default CommentPage;