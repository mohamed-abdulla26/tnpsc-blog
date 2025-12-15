


import connectMongo from "@/utils/connectMongo";
import CtaModel from "@/models/cta";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const ctas = await CtaModel.find().lean();
  return NextResponse.json({ success: true, data: ctas });
}
