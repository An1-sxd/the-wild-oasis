import supabase from "../../supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabin could not be deleted");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Date.now()}-${newCabin.image.name}`; // unique name (avoid collisions)

  // 1. Upload the image file to Supabase Storage
  const { error: storageError } = await supabase.storage
    .from("cabins-images") // 👈 your bucket name
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.log(storageError);
    throw new Error("Image could not be uploaded");
  }

  // 2. Get public URL after upload succeeds
  const { data: publicUrlData } = supabase
    .storage
    .from("cabins-images")
    .getPublicUrl(imageName);

  const imagePath = publicUrlData.publicUrl;

  // 3. Insert newCabin with public imagePath into DB
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("cabin could not be created");
  }

  return data;
}
