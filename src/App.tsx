import React, { useState } from "react";
import "./App.css";
import BlogPostList from "./components/BlogPosts/BlogPostList";
import Footer from "./components/Footer";
import NewBlogPostForm from "./components/NewBlogPostForm";
interface BlogPost {
  text: string;
  date: string;
  important: string;
  creationDate: string;
  id: number;
}
function App(): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [deletedPosts, setDeletedPosts] = useState<BlogPost[]>([]);

  const onDelete = (postToDelete: BlogPost) => {
    setDeletedPosts((prevDeletedPosts) => [...prevDeletedPosts, postToDelete]);
    setPosts((prevPosts) => prevPosts.filter((post) => post !== postToDelete));
  };

  const onEdit = (postToUpdate: BlogPost, updatedValues: object) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post === postToUpdate ? { ...post, ...updatedValues } : post
      )
    );
  };

  const addNewPost = (values: BlogPost, creationDate: Date) => {
    setPosts((prevPosts) => [
      ...prevPosts,
      { ...values, creationDate: creationDate.toISOString() },
    ]);
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
export type { BlogPost };
export default App;
// const onEdit = (postToDelete: object, values: object) => {
//   setPosts((prevPosts) =>
//     prevPosts.map((post) => (post === postToEdit ? { ...values } : post))
//   );
// };
