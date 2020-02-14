import { uploader } from 'cloudinary';
import Datauri from 'datauri';
import path from 'path';
import cloudinaryConfig from '../database/config/cloudinaryConfig';

const dataUri = new Datauri();

const imageUpload = async req => {
  const file = dataUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer,
    cloudinaryConfig
  ).content;
  const uploadedImage = await uploader.upload(file);
  return uploadedImage.url;
};

export default imageUpload;
