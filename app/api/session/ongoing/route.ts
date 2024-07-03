import { createClient } from "@/app/utils/supabase/server";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (user) {
    const userId = user.data.user?.id;
    const { data, error } = await supabase
      .from("sessions")
      .select("id")
      .eq("owner_uuid", userId)
      .eq("status", "ongoing")
      .single();
    if (data) {
      console.log("supabase data", data);
      return NextResponse.json(
        { isOngoing: true, session_uuid: data.id },
        { status: 200 }
      );
    } else if (error.code === "PGRST116") {
      console.log("supabase data no found", error);
      return NextResponse.json(
        { isOngoing: false, session_uuid: null },
        { status: 200 }
      );
    } else if (error) {
      console.log("supabase error", error);
      return NextResponse.json(error, { status: 404 });
    }
  } else if (error) {
    return NextResponse.json(error, { status: 404 });
  }
}
