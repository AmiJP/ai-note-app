import OpenAI from "openai";

export class OpenAiClient {
  private openai: OpenAI;
  private imageModel: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: "your api key",
    });
    this.imageModel = "dall-e-2";
  }

  async imageGenerate({ prompt }: { prompt: string }) {
    const response = await this.openai.images.generate({
      model: this.imageModel,
      prompt,
      size: "256x256",
    });
    let image = response.data[0].url;

    if (!image) {
      throw new Error("image not found.");
    }
    return image;
  }
}
