

import Post from "@/components/Post";
import connectMongo from "@/utils/connectMongo";
import ctaModel from "@/models/cta"
import PostModel from "@/models/postModel";
import mongoose from "mongoose";

export async function generateMetadata({ params }) {
  await connectMongo();
  if (!mongoose.Types.ObjectId.isValid(params.id)) return { title: "Post Not Found", description: "Invalid post" };
  const post = await PostModel.findById(params.id).lean();
  if (!post) return { title: "Post Not Found", description: "Post not found" };

  return {
    title: post.title,
    description: post.metaDescription || post.description.replace(/<[^>]+>/g, "").slice(0,160),
  };
}

/* ==============================
   PAGE COMPONENT
============================== */
export default async function Page({ params }) {
  await connectMongo();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return (
      <p className="text-center mt-10 text-red-600">
        Invalid Post ID
      </p>
    );
  }

  const post = await PostModel.findById(params.id)
    .populate("cta")
    .lean();

  if (!post) {
    return (
      <p className="text-center mt-10 text-red-600">
        Post not found
      </p>
    );
  }

  const latestPosts = await PostModel.find({ _id: { $ne: params.id } })
    .sort({ created_at: -1 })
    .limit(5)
    .lean();

  return (
    <Post
      post={JSON.parse(JSON.stringify(post))}
      relatedPosts={JSON.parse(JSON.stringify(latestPosts))}
    />
  );
}
