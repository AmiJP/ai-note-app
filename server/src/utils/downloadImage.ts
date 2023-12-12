import axios from "axios";

export async function downloadImage(imageUrl: string) {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

  return Buffer.from(response.data, "binary");
}
