import BlogPostItem from "./BlogPostItem";
import { BlogPost } from "../../App";

interface BlogPostListProps {
  posts: BlogPost[];
  deletedPosts: BlogPost[];
  onDelete: (postToDelete: BlogPost) => void;
  onEdit: (postToEdit: BlogPost, updatedValues: object) => void;
}

function BlogPostList({
  posts,
  deletedPosts,
  onDelete,
  onEdit,
}: BlogPostListProps) {
  const currentDateString = new Date().toISOString().slice(0, 10);
  const renderedMissedPosts = posts.filter(
    (post) => post.date < currentDateString
  );

  let postId = 0;
  let postIdDeleted = 0;

  const renderPostList = (list: any[], isDeleted = false) =>
    list.map((post) => {
      isDeleted ? postIdDeleted++ : postId++;
      // https://www.youtube.com/watch?v=DmH6YPWhaDY

      return (
        <BlogPostItem
          key={isDeleted ? postIdDeleted : postId}
          text={post.text}
          date={post.date}
          isImportant={post.important}
          creationDate={post.creationDate}
          id={isDeleted ? postIdDeleted : postId}
          onDelete={() => onDelete(post)}
          onEdit={(updatedValues: object) => onEdit(post, updatedValues)}
          isDeleted={isDeleted}
        />
      );
    });

  return (
    <>
      {posts.length > 0 && (
        <>
          <p>Wydarzenia</p>
          <ul className="flex gap-5 mb-20 flex-wrap max-w-6xl justify-center">
            {renderPostList(
              posts.filter((post) => post.date >= currentDateString)
            )}
          </ul>
        </>
      )}
      {renderedMissedPosts.length > 0 && (
        <>
          <p>Przegapione wydarzenia:</p>
          <ul className="flex gap-5 mb-20 flex-wrap max-w-6xl justify-center opacity-60">
            {renderPostList(renderedMissedPosts)}
          </ul>
        </>
      )}
      {deletedPosts.length > 0 && (
        <>
          <p>Usunięte wydarzenia:</p>
          <ul className="flex gap-5 mb-20 flex-wrap max-w-6xl justify-center opacity-30">
            {renderPostList(deletedPosts, true)}
          </ul>
        </>
      )}
    </>
  );
}

export default BlogPostList;
