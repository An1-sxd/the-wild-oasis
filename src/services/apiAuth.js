import supabase from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log(data);

  return data;
}

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

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1_ update fullName OR Password:
  let updatedData;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2_ upload Avatar File to storage:
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3_ update avatar prop in user data:
  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  const filePath = publicUrlData.publicUrl;

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: filePath },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
