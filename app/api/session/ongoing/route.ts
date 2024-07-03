import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data) {
    const userId = data.user.id;
    console.log(data);

    const { data, error } = await supabase
      .from("sessions")
      .select("id")
      .eq("owner_uuid", userId)
      .eq("status", "ongoing")
      .single();
    if (data) {
      return NextResponse.json(data, { status: 200 });
    } else if (error) {
      return NextResponse.json(error, { status: 404 });
    }
  } else if (error) {
    return NextResponse.json(error, { status: 404 });
  }
}
