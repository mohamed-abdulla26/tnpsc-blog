

import CtaModel from "@/models/cta";
import connectMongo from "@/utils/connectMongo";

export async function POST(req) {
  await connectMongo();
  const { text, actionType, actionValue } = await req.json();

  const newCta = await CtaModel.create({ text, actionType, actionValue });

  return new Response(JSON.stringify({
    success: true,
    message: "CTA created successfully",
    data: newCta
  }), { status: 200 });
}
