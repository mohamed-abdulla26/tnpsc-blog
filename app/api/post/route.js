

// import connectMongo from "@/utils/connectMongo";
// import PostModel from "@/models/postModel";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     await connectMongo();
//     const body = await req.json();

//     const { title, description, image, } = body;

//     if (!title || !description) {
//       return NextResponse.json(
//         { success: false, message: "Title and description are required" },
//         { status: 400 }
//       );
//     }

//     const finalImage = image && image.trim() !== "" ? image : "default.jpg";

//     const newPost = await PostModel.create({
//       title,
//       description,
//       image: finalImage,
  

      
//     });

//     // ✅ Fix: Convert mongoose doc → plain JSON
//     return NextResponse.json({
//       success: true,
//       post: newPost.toObject(),  // <-- FIX HERE
//     });

//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();
    const { title, description, image, cta } = await req.json();

    const finalImage = image?.trim() !== "" ? image : "default.jpg";

    const newPost = await PostModel.create({
      title,
      description,
      image: finalImage,
      cta: cta

    });

    return NextResponse.json({ success: true, post: newPost.toObject() });

  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}







