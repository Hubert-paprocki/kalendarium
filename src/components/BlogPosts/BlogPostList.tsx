import BlogPostItem from "./BlogPostItem";
import BlogPost from "./BlogPostInterface";

interface BlogPostListProps {
  readonly posts: BlogPost[];
  readonly deletedPosts: BlogPost[];
  readonly onDelete: (postToDelete: BlogPost) => void;
  readonly onEdit: (updatedPost: BlogPost) => void;
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

  const renderPostList = (list: BlogPost[]) =>
    list.map((post, index) => {
      return (
        <BlogPostItem
          key={index + 1}
          text={post.text}
          date={post.date}
          isImportant={post.important === "true"}
          creationDate={post.creationDate}
          id={index + 1}
          onDelete={() => onDelete(post)}
          onEdit={(newBlogPost: BlogPost) => onEdit(newBlogPost)}
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
            {renderPostList(deletedPosts)}
          </ul>
        </>
      )}
    </>
  );
}

export default BlogPostList;
