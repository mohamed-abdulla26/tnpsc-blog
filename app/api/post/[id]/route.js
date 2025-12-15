


import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongo();
  const post = await PostModel.findById(params.id).populate("cta").lean();
  if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });
  return NextResponse.json(post);
}
