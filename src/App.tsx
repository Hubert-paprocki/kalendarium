import React, { useState } from "react";
import "./App.css";
import BlogPostList from "./components/BlogPosts/BlogPostList";
import Footer from "./components/Footer";
import NewBlogPostForm from "./components/NewBlogPostForm";
import BlogPost from "./components/BlogPosts/BlogPostInterface";

function App(): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [deletedPosts, setDeletedPosts] = useState<BlogPost[]>([]);

  const onDelete = (postToDelete: BlogPost) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post !== postToDelete));
    setDeletedPosts((prevDeletedPosts) => [...prevDeletedPosts, postToDelete]);
  };

  const onEdit = (updatedPost: BlogPost) => {
    console.log(updatedPost, `updatedPost`);
    setPosts((prevPosts) =>
      prevPosts.map((post, index) =>
        index + 1 === updatedPost.id ? { ...updatedPost } : post
      )
    );
  };

  const addNewPost = (values: BlogPost) => {
    setPosts((prevPosts) => [...prevPosts, { ...values }]);
  };

  return (
    <>
      <div className="bg-zinc-800 min-h-screen text-white flex items-center flex-col">
        <h1 className="font-bold text-2xl">Kalendarium czy coś takiego</h1>
        <NewBlogPostForm onSubmit={addNewPost} />
        <BlogPostList
          posts={posts}
          onDelete={onDelete}
          onEdit={onEdit}
          deletedPosts={deletedPosts}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
