import Resizer from "react-image-file-resizer";

export const resizeFile = (file: File): Promise<File> =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "WEBP",
      100,
      0,
      uri => {
        resolve(uri as File);
      },
      "file"
    );
  });
