import User from "@/app/models/Users";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        await connectMongoDB();
        const { email } = await request.json();
        const user = await User.findOne({ email }).select("_id");
        return NextResponse.json(user)
    }catch(error){
        console.error("Error checking user existence: ", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}