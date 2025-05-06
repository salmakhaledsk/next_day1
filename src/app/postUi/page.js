"use client"
import React, { useState } from 'react';

function PostUi() {
  const [post, setPost] = useState([]);
  const [postInput, setPostInput] = useState("");

  async function getPost() {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    setPost(data);
  }

  async function addPost() {
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify({ title: postInput }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    //update changes 
    getPost();
    setPostInput("");
  }

  async function deletePost(id) {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE"
    });
    getPost(); 
  }

  return (
    <>
      <div className="container mt-4">
        <div className="input-group mb-3">
          <input value={postInput} onChange={(e) => setPostInput(e.target.value)} type="text" className="form-control"  data-has-listeners="true" placeholder="Enter something..." />
          <button className="btn btn-primary" onClick={addPost} type="button">Add</button>
        </div>
      </div>

      <button className="btn btn-success" onClick={getPost}>Get All Posts</button>

      {post.map((post) => (
        <div key={post.id} className="border p-2 my-2">
          <h2>{post.title}</h2>
          <p>{post.content}</p>

          <button className="btn btn-danger" onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default PostUi;
