import { createClient } from "@/utils/supabase/server";

export async function createUser(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
  }
  console.log(data);
}
