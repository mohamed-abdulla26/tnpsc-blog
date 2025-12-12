// import CtaModel from "@/models/Cta";
// import connectMongo from "@/utils/connectMongo";

// export async function GET() {
//   await connectMongo();

//   const ctas = await CtaModel.find().sort({ createdAt: -1 });

//   return Response.json({
//     message: "CTA List",
//     data: ctas
//   });
// }


import connectMongo from "@/utils/connectMongo";
import CtaModel from "@/models/cta";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();

    const ctas = await CtaModel.find().lean();

    return NextResponse.json({
      success: true,
      data: ctas
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err.message
    }, { status: 500 });
  }
}
