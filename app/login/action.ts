"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // Retrieve email and password from the formData
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login error:", error);
    redirect("/error");
  } else {
    revalidatePath("/", "layout");
    redirect("/");
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // Retrieve email and password from the formData
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("Signup error:", error);
    redirect("/error");
  } else {
    revalidatePath("/", "layout");
    redirect("/");
  }
}
