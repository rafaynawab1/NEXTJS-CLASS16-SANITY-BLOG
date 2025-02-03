import React from "react";
import { getPostBySlug } from "../../../../sanity/sanity-utils";
import RenderBodyContent from "../../../../components/Blog/RenderBodyContent";

const SingleBlogPage = async ({ params }: { params: any }) => {
  const post = await getPostBySlug(params.slug);

  return (
    <article className="my-10 border border-gray-300 dark:border-gray-600 p-6 rounded-lg shadow-md text-center">
  <div className="mb-5">
    <h1 className="text-3xl py-2 font-bold text-gray-800 dark:text-gray-200">{post.title}</h1>
    <p className="pb-1 text-gray-600 dark:text-gray-400">
      <span className="font-medium">Published:</span> {new Date(post.publishedAt).toDateString()}
      <span className="font-medium pl-2">by </span> {post.author.name}
    </p>

    <p className="text-gray-700 dark:text-gray-300">{post.metadata.slice()}</p>
  </div>

  <article className="prose lg:prose-xl border-t border-gray-300 dark:border-gray-600 pt-4">
    <RenderBodyContent post={post} />
  </article>
</article>

  );
};

export default SingleBlogPage;