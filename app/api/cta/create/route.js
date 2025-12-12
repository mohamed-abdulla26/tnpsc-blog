import CtaModel from "@/models/Cta";
import connectMongo from "@/utils/connectMongo";


export async function POST(req) {
  await connectMongo();

  const { text, actionType, actionValue } = await req.json();

  const newCta = await CtaModel.create({ text, actionType, actionValue });

  return Response.json({
    message: "CTA created successfully",
    data: newCta
  });
}
