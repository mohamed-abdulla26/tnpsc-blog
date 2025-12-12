
// import { NextResponse } from "next/server";
// import connectMongo from "@/utils/connectMongo";
// import PostModel from "@/models/postModel";

// export async function GET(req, { params }) {
//   try {
//     await connectMongo();

//     const postData = await PostModel.findById(params.id).lean(); // ✔ FIXED

//     if (!postData) {
//       return NextResponse.json({ message: "Post not found" }, { status: 404 });
//     }

//     return NextResponse.json(postData); // ✔ Now plain JS object
//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import connectMongo from "@/utils/connectMongo";
// import PostModel from "@/models/postModel";

// export async function GET(req, { params }) {
//   try {
//     await connectMongo();

//     // ⭐ POPULATE CTA DETAILS
//     const post = await PostModel.findById(params.id).populate("cta").lean();

//     if (!post)
//       return NextResponse.json({ message: "Post not found" }, { status: 404 });

//     return NextResponse.json(post);

//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }


import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongo();

    // ⭐ REQUIRED: populate CTA (VERY IMPORTANT)
    const post = await PostModel.findById(params.id)
      .populate("cta")   // <-- THIS MAKES CTA FULL OBJECT.
      .exec();

    if (!post)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    return NextResponse.json(JSON.parse(JSON.stringify(post)));

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
