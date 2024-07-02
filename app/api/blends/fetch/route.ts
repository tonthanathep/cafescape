import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  const supabase = createClient();

  const { data, error } = await supabase
    .from("blends")
    .select("id, name, layerType");
  if (data) {
    return NextResponse.json(data, { status: 200 });
  } else if (error) {
    return NextResponse.json(error, { status: 404 });
  }
}
