import Post from "@/components/Post";
import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";

// Metadata
export async function generateMetadata({ params }) {
  await connectMongo();
  const post = await PostModel.findById(params.id).lean(); // <-- lean

  if (!post) return { title: "Post Not Found" };
  return { title: post.title };
}

export default async function Page({ params }) {
  await connectMongo();

  const post = await PostModel.findById(params.id).lean(); // <-- lean

  if (!post) {
    return <p className="text-center mt-10 text-red-600">Post not found</p>;
  }

  const latestPosts = await PostModel.find({ _id: { $ne: params.id } })
    .sort({ created_at: -1 })
    .limit(5)
    .lean(); // <-- lean

  return <Post post={post} posts={latestPosts} />;
}
