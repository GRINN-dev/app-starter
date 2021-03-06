import { FC } from "react";
import { DragEvent, ChangeEvent, useState } from "react";
export interface FileDragNDropProps {
  title: string;
  id: string;
  onFileUpload: (files: File[]) => void;
}

//random int between 1 and 1000000

export const FileDragNDrop: FC<FileDragNDropProps> = ({
  title,
  onFileUpload,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const fileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    loadFiles(Array.from(files));
    console.log(files);
  };

  const loadFiles = async (files: File[]) => {
    setLoading(true);
    onFileUpload(files);
    setLoading(false);
  };
  //permet de récup fichiers dans DocumentUploadCard

  const fileUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    // max file size 10mb
    const maxFileSize = 10 * 1024 * 1024;
    // alert if a file is too big
    if (e.target.files && e.target.files[0].size > maxFileSize) {
      alert("Le fichier est trop volumineux");
      return;
    }
    const files = e.target.files;
    loadFiles(Array.from(files!));
  };

  return (
    <div className="relative group">
      <div
        className={
          "flex justify-center px-3 py-3 text-sm bg-gray-200 border-2 border-dashed rounded-xl text-primary-500 border-gray-300 " +
          (isDraggedOver
            ? "border-primary-500 bg-gradient-to-tr from-accent-50 to-accent-900"
            : "")
        }
      >
        <div
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          className="flex flex-col items-center p-4 m-2"
        >
          <span className="text-base text-center py-1 px-1.5">
            Glissez vos documents ici
          </span>
          <span>ou</span>
          <label htmlFor={id} className="">
            <span className="text-base underline text-center cursor-pointer group-hover:shadow-xl group-hover:text-primary-500 py-1 px-1.5 rounded group-hover:bg-accent-500">
              Cliquez pour choisir
            </span>
            <input
              id={id}
              accept="image/*,application/pdf"
              name={id}
              type="file"
              className="sr-only file:m-4 file:px-8 file:py-1 file:text-sm file:bg-white"
              onChange={e => fileUploaded(e)}
            />
          </label>
        </div>
      </div>
      <div
        onDragEnter={dragEnter}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className="absolute inset-0 cursor-pointer"
        onClick={e => {
          e.preventDefault();
          document?.getElementById(id)?.click();
        }}
      ></div>
    </div>
  );
};

//export const FileDragNDrop = React.memo(FileDragNDropUnMemo);
