import { FC } from "react";
import { FormLoaderProps } from ".";
import Image from "next/image";
const grinn_blue_bg = require("../../public/grinn_blue_bg.svg");

export const Loader: FC<FormLoaderProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden ">
      <div className="absolute inset-0 bg-gray-200 opacity-70"></div>
      {message && (
        <h2 className="relative text-xl font-semibold text-center font-ApfelGrotezkFett text-primary-500">
          {message}
        </h2>
      )}
      <div className="relative w-32 h-32 my-12 opacity-100">
        <Image
          layout="fill"
          src={grinn_blue_bg}
          alt="chargement en cours"
          className="absolute inset-0 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};
