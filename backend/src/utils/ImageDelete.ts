import fs from 'fs';
import path from 'path';

export const imageDelete = async (filename: string, callback: Function) => {
  const image_path = path.join(__dirname, '..', '..', 'uploads', filename);
  fs.unlink(image_path, (err) => {
    if (err) {
      console.log(err);
      callback();
    }
  });
}
