import supabase from "./supabase";
const supabaseUrl = "https://sqyfnfdqixejekchzicd.supabase.co/";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded : " + error.message);
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabin could not be deleted : " + error.message);
  }

  return data;
}

export async function createCabin(newCabin) {
  // if image already exists in db
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  let imagePath;

  if (hasImagePath) {
    // if image exists in db
    imagePath = newCabin.image;
  } else {
    // if image doesn't exist in db

    const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );
    // <<unique>> name (avoid collisions) + <<replace>> all slashes (/) so supabase doesn't create foldres instead !

    // 1. Upload the image file to Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("cabin-images") // 👈 your bucket name
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.log(storageError);
      throw new Error("Image could not be uploaded : " + storageError.message);
    }

    // 2. Get public URL after upload succeeds
    const { data: publicUrlData } = supabase.storage
      .from("cabin-images")
      .getPublicUrl(imageName);

    imagePath = publicUrlData.publicUrl;
  }
  // 3. Insert newCabin with public imagePath into DB
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("cabin could not be created : " + error.message);
  }

  return data;
}

export async function EditCabin(id, editedCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .update(editedCabin)
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("cabin could not be edited : " + error.message);
  }

  return data;
}
