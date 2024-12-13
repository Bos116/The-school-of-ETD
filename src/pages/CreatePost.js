import React, { useState, useEffect } from 'react';
import { addDoc, collection} from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
{/* create post page */}
const CreatePost = ({isAuth}) => {
  //create posts props utilizing useState
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const postCollectionRef = collection(db, "posts");//db reference
  let navigate = useNavigate();
  const CreatePost = async () => {
    await addDoc(postCollectionRef, {//formattting doc for db
        title, 
        postText, 
        Author: {
          name: auth.currentUser.displayName, 
          Id: auth.currentUser.uid
        }})
      navigate('/')
    };

  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Create a Post</h1>
        <div className='inputGp'>
          <label>Title:</label>
          <input 
            placeholder='Title...' 
            onChange={(event) =>{
              setTitle(event.target.value)
            }}
          />
        </div>
        <div className='inputGp'>
          <label>Post:</label>
          <textarea placeholder='Post...' 
              onChange={(event) =>{
              setPostText(event.target.value)
            }}
          />
        </div>
        <button onClick={CreatePost}> Submit Post </button>
      </div>
    </div>
  )
}

export default CreatePost