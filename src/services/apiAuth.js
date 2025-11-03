import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log(data);

  return data.user; // **we care only to return user**
}


export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

/*
import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  console.log("🔍 getCurrentUser called");
  
  // First check if there's an active session
  const { data: sessionData } = await supabase.auth.getSession();

  console.log("📦 Session data:", {
    hasSession: !!sessionData.session,
    accessToken: sessionData.session?.access_token ? "exists" : "none"
  });

  if (!sessionData.session) {
    console.log("❌ No active session found - returning null");
    return null;
  }

  // Only fetch user if we have a session
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("❌ Error getting user:", error.message);
    // If token is invalid, return null instead of throwing
    return null;
  }

  console.log("✅ Current user found:", data?.user?.email);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
*/
