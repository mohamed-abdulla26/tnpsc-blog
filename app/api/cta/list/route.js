import CtaModel from "@/models/Cta";
import connectMongo from "@/utils/connectMongo";

export async function GET() {
  await connectMongo();

  const ctas = await CtaModel.find().sort({ createdAt: -1 });

  return Response.json({
    message: "CTA List",
    data: ctas
  });
}
