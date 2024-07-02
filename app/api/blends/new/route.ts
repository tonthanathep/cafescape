import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

// API for handling creating new Blend
export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
    console.log(body);
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  const newBlend = { ...body };

  if (data) {
    const { data, error } = await supabase
      .from("blends")
      .insert(newBlend)
      .select();
    if (data) {
      return NextResponse.json(data, { status: 200 });
    } else if (error) {
      console.log(error);
      return NextResponse.json(error, { status: 500 });
    }
  } else if (error) {
    throw error;
  }

  //   if (error) {
  //     console.error("Error updating blend:", error);
  //     return NextResponse.json(
  //       { error: "Failed to update blend" },
  //       { status: 500 }
  //     );
  //   }

  return NextResponse.json(null, { status: 200 });
}
