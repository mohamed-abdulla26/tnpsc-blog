


import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  const {
    title,
    h1,
    metaDescription,
    description,
    image,
    cta,
  } = body;

  if (!title || !h1 || !metaDescription || !description) {
    return NextResponse.json({
      success: false,
      message: "Title, H1, Meta Description & Description are required",
    });
  }

  const newPost = await PostModel.create({
    title,
    h1,
    metaDescription,
    description,
    image: image || "default.jpg",
    cta: cta ? new mongoose.Types.ObjectId(cta) : null,
  });

  return NextResponse.json({ success: true, post: newPost });
}
