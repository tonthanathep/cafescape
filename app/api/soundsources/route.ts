import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  console.log("hello");

  const { data, error } = await supabase.from("sound_sources").select("*");
  if (data) {
    return NextResponse.json(data, { status: 200 });
  } else if (error) {
    return NextResponse.json(error, { status: 404 });
  }
}
