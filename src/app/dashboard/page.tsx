import DashboardClient from "@/components/DashboardClient";
import { createClient } from "@/lib/supabase/server";
import { Course } from "@/types";

export default async function Page() {
  const supabase = await createClient();
  let courses: Course[] | null = null;
  let errorMsg: string | null = null;

  if (!supabase) {
    errorMsg = "Missing Supabase environment variables. Please check your .env.local file.";
  } else {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase query error:", error.message);
        errorMsg = `Failed to fetch courses: ${error.message}`;
      } else {
        courses = data as Course[];
      }
    } catch (err: any) {
      console.error("Supabase connection error:", err);
      errorMsg = "Failed to connect to the database. Please check your connection.";
    }
  }

  return (
    <DashboardClient courses={courses} error={errorMsg} />
  );
}
