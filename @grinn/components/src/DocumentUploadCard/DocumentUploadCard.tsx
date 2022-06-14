import { FC, useState, useEffect } from "react";
import { FileDragNDrop } from "../FileDragNDrop";
import { TrashIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { Card } from "../Card";
import { Typography } from "../Typography";
const pdficon = "/pdficon.svg";

export interface DocumentUploadCardProps {
  title: string;
  description?: string;
  onChange: (files: File[]) => void;
  id?: string;
}

export const DocumentUploadCard: FC<DocumentUploadCardProps> = ({
  title,
  description,
  onChange,
  id,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    onChange(files);
  }, [files]);

  return (
    <Card className="p-8">
      <Typography color="primary" weight="bold" size="2xl" as="h2">
        {title}
      </Typography>
      <Typography as="p" className="mt-1 text-gray-400">
        {description}
      </Typography>
      <div className="flex-col hidden mt-4 md:flex ">
        <FileDragNDrop
          id={"fileDnD" + id}
          title={title}
          onFileUpload={file => {
            setFiles(files => [...files, ...file]);
          }}
        />
      </div>
      <div className="mt-4 md:hidden">
        <p>
          <label
            htmlFor={"imageFile-" + id}
            className="inline-flex justify-center w-full px-3 py-2 mx-auto mt-2 rounded-full bg-accent-500"
          >
            Prendre une photo
            <input
              type="file"
              id={"imageFile-" + id}
              capture="environment"
              accept="image/*,application/pdf"
              className="sr-only"
              onChange={e => {
                const file = e.target.files![0];
                if (file.size > 10 * 1024 * 1024) {
                  alert("Le fichier est trop volumineux");
                  return;
                }
                file && setFiles(files => [...files, file]);
              }}
            />
          </label>
        </p>
        <p>
          <label
            htmlFor={"docUpload-" + id}
            className="inline-flex justify-center w-full px-3 py-2 mx-auto mt-2 bg-white border rounded-full border-accent-500"
          >
            Charger un document
            <input
              className="sr-only"
              id={"docUpload-" + id}
              type="file"
              accept="image/*,application/pdf"
              onChange={e => {
                const file = e.target.files![0];
                // alert if file is over 10mb
                if (file.size > 10 * 1024 * 1024) {
                  alert("Le fichier est trop volumineux");
                  return;
                }
                file && setFiles(files => [...files, file]);
              }}
            />
          </label>
        </p>
      </div>
      <div className="grid gap-1 px-2 mt-4">
        {files.map((file, i) => {
          return (
            <div
              className="flex w-full overflow-hidden bg-gray-100 rounded "
              key={i}
            >
              <div className="flex flex-grow p-1 items">
                <button
                  className=" md:block"
                  type="button"
                  onClick={() => {
                    //delete the file from the list
                    setFiles(files => {
                      const filesCopy = [...files];
                      filesCopy.splice(i, 1);
                      return filesCopy;
                    });
                  }}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>

                <div className="flex flex-col justify-center flex-grow h-full mt-3">
                  <span className="flex-grow inline-block ml-2 text-xs text-gray-600 break-all align-middle line-clamp-1">
                    {/* create a link to open file in new tab */}
                    <a
                      href={URL.createObjectURL(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name}
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <a
                  href={URL.createObjectURL(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.name.includes(".jpg") ||
                  file.name.includes(".jpeg") ||
                  file.name.includes(".png") ||
                  file.name.includes(".svg") ||
                  file.name.includes(".gif") ? (
                    <div className="relative w-12 h-12 ">
                      <Image
                        className="absolute inset-0 object-contain object-center bg-gray-200 "
                        src={URL.createObjectURL(file)}
                        alt={"uploaded doc"}
                        layout="fill"
                      />
                    </div>
                  ) : file.name.includes(".pdf") ? (
                    <div className="relative w-12 h-12 ">
                      <Image
                        src={pdficon}
                        alt="pdf-icon"
                        layout="fill"
                        className="absolute inset-0 object-contain object-center bg-gray-200 "
                      />
                    </div>
                  ) : (
                    <div className="relative w-12 h-12 bg-gray-200 " />
                  )}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
