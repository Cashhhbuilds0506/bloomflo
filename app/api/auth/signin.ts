import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Verify credentials with Supabase
    // TODO: Create session

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Sign in failed" }, { status: 400 })
  }
}
