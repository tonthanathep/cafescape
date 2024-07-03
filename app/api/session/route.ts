import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Get Session Data
export async function GET(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", body.id)
    .single();

  if (error) {
    console.error("Error fetching blend:", error);
    return NextResponse.json({ error: "Blend not found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

// Create New Session Record
export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createClient();
  let newSession = {
    ...body,
    id: undefined,
    created_at: undefined,
    owner_uuid: undefined,
  };

  const { data, error } = await supabase.from("sessions").insert(newSession);

  if (error) {
    console.error("Error creating sessions:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

// Update Session Data
export async function PUT(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("sessions")
    .update(body)
    .eq("id", body.id)
    .single();

  if (error) {
    console.error("Error updating session:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
