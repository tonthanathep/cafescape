import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

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
    status: "ongoing",
    score: 0,
    duration: 0,
  };
  const { data, error } = await supabase.auth.getUser();
  if (data) {
    console.log(newSession);
    const { data, error } = await supabase
      .from("sessions")
      .insert(newSession)
      .select();
    if (data) {
      console.log("new session created: ", data);
      return NextResponse.json(data, { status: 200 });
    } else if (error) {
      console.log(error);
      return NextResponse.json(error, { status: 500 });
    }
  } else if (error) {
    console.log("error", error);
  }

  return NextResponse.json(null, { status: 200 });
}

// Update Session Data (For now only for ending session)
export async function PUT(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createClient();
  console.log("update body", body);

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

// Abandon Session or Delete Session
export async function DELETE(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createClient();
  console.log("delete", body);
  const { data, error } = await supabase
    .from("sessions")
    .delete()
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
