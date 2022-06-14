import { FC } from "react";
import Image from "next/image";
import { CardProps } from "./types";

export const Card: FC<CardProps> = ({
  image,
  alt,
  children,
  className,
  onClick,
}) => {
  return (
    <div
      className={
        "relative overflow-hidden bg-white border border-gray-100 shadow-xl h-full rounded-xl  p-4 md:p-8 " +
        className
      }
      onClick={onClick}
    >
      {image && (
        <div className="absolute w-20 h-20 -right-20 -bottom-10 md:w-60 md:h-60">
          <Image
            src={image}
            alt={alt}
            layout="fill"
            className="absolute inset-0 object-contain object-right-bottom opacity-40"
          />
          {/* -z-10 */}
        </div>
      )}
      {children}
    </div>
  );
};
