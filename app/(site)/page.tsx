export const revalidate = 10; // Revalidate every 10 seconds

import { getPosts } from "../../sanity/sanity-utils"; 
import Blog from "../../components/Blog/index";

export default async function Home() {
  const posts = await getPosts(); // Ensure fresh data is fetched

  return (
    <div className="py-5">
      {posts?.length > 0 ? (
        posts.map((post: any) => <Blog key={post._id} blog={post} />)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
