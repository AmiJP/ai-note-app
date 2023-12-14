import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class AwsClient {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;
  private accessKeyId: string;
  private secretAccessKey: string;

  constructor() {
    this.bucketName = "ai-note-images";
    this.region = "your region";
    this.accessKeyId = "your accessKeyId";
    this.secretAccessKey = "your secretAccessKey";
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async uploadImage(title: string, imgbuffer: Buffer) {
    let imgKey = title + Math.floor(Math.random() * 100000);
    const uploadParams = {
      Bucket: this.bucketName,
      Body: imgbuffer,
      Key: imgKey,
      ContentType: "image/jpeg",
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));
    return imgKey;
  }

  async getImg(imgKey: string) {
    const imgURL = await getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: imgKey,
      }),
      { expiresIn: 24 * 60 * 60 }
    );
    return imgURL;
  }

  async deleteImg(imgKey: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: imgKey,
    };

    return this.s3Client.send(new DeleteObjectCommand(deleteParams));
  }
}
