import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    console.log("Received image processing request");
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      console.log("No file found in request");
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    console.log("File received:", file.name, file.type, file.size);

    // Create a Blob from the file
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });

    // Convert Blob to File
    const imageFile = new File([blob], file.name, { type: file.type });

    console.log("Calling OpenAI API...");
    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt:
        "Transform this image into Studio Ghibli art style without changing ANY positions, sizes, or layouts. Maintain EXACT positioning of all elements. Keep all objects in PRECISELY the same locations. Apply ONLY Studio Ghibli aesthetic effects. Do NOT add any new elements and do NOT remove anything from the original. Preserve all details including faces, expressions, clothing, backgrounds, and objects at their exact positions and proportions. The ONLY change should be the visual style, nothing else.",
    });

    console.log("OpenAI API response received");
    const imageData = response.data?.[0]?.b64_json;
    if (!imageData) {
      console.log("No image data in OpenAI response");
      throw new Error("No image data received from OpenAI");
    }

    console.log("Returning processed image");
    return NextResponse.json({ image: imageData });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
