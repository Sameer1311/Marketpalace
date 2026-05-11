import { connectMongoDB } from "@/lib/mongodb"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

import User from "@/app/models/Users"

export async function POST(request) {
  try {
    const { name, email, password } =
      await request.json()

    await connectMongoDB()

    // Check existing user
    const existingUser = await User.findOne({
      email,
    })

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "User already exists with this email",
        },
        {
          status: 400,
        }
      )
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10)

    // Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Success response
    return NextResponse.json(
      {
        message:
          "User registered successfully",
      },
      {
        status: 201,
      }
    )

  } catch (error) {
    console.error(
      "Error in registration:",
      error
    )

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    )
  }
}       