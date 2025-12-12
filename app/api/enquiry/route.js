import connectMongo from "@/utils/connectMongo";
import EnquiryModel from "@/models/enquiryModel";

export async function POST(req) {
    try {
        const { name,email,phone} = await req.json();
        const enquiry = {name,email,phone};
        await connectMongo();
        await EnquiryModel.create(enquiry)
        return Response.json({message: 'Enquiry has been sent!'})
    } catch (error) {
        return Response.json({message: error._message})
    }
}

