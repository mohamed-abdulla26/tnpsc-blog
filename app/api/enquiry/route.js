


import connectMongo from "@/utils/connectMongo";
import EnquiryModel from "@/models/enquiryModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();

    const { name, email, phone } = await req.json();

    // ✅ REQUIRED CHECK
    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // ✅ PHONE VALIDATION (India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 400 }
      );
    }

    // ✅ SAVE
    await EnquiryModel.create({ name, email, phone });

    return NextResponse.json(
      { message: "Enquiry submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

