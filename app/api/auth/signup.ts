import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Hash password and save to Supabase
    // TODO: Create user record

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Sign up failed" }, { status: 400 })
  }
}
