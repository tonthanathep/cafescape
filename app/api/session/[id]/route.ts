import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Get Session Data
export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  const supabase = createClient();

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching blend:", error);
    return NextResponse.json({ error: "Blend not found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}
