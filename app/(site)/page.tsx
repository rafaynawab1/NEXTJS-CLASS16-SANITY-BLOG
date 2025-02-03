export const revalidate = 10; // Revalidate every 10 seconds

import { getPosts } from "../../sanity/sanity-utils";
import BlogComponent from "../../components/Blog/index";

// Import the Blog type
import { Blog } from "../../types/blog";

export default async function Home() {
  const posts = await getPosts(); // Ensure fresh data is fetched

  return (
    <div className="py-5">
      {posts?.length > 0 ? (
        posts.map((post: Blog) => {
          return <BlogComponent key={post._id} blog={post} />;
        })
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
