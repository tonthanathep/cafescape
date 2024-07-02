import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  // Validate the ID to ensure it is a valid UUID

  const supabase = createClient();

  const { data, error } = await supabase
    .from("blends")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching blend:", error);
    return NextResponse.json({ error: "Blend not found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("blends")
    .update(body)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error updating blend:", error);
    return NextResponse.json(
      { error: "Failed to update blend" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
