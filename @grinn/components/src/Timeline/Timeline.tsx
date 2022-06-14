import { ActiveIcon } from "@grinn/icons";
import { FC } from "react";
import { TimelineProps } from "./types";

export const Timeline: FC<TimelineProps> = ({ steps, step }) => {
  return (
    <div className="font-ApfelGrotezk">
      <ol className="w-full sm:flex">
        {steps.map((s, i) => {
          return (
            <li className="w-max" key={i}>
              <div className="flex">
                <div
                  className={`${
                    (step[0] && s.active) || s.completed
                      ? " !text-primary-500 !font-ApfelGrotezk  "
                      : "text-gray-500"
                  }  `}
                >
                  <div
                    style={{ color: "#4de1be" }}
                    className={`${
                      s.completed
                        ? "  z-10 flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 border-none"
                        : s.active
                        ? "  z-1000 bg-white items-center  border-primary-500 "
                        : "  z-1000 flex justify-center w-6 h-6 rounded-full bg-gray-300 border-white border-3 "
                    } absolute flex justify-center w-6 h-6 rounded-full border-2`}
                  >
                    {s.completed ? (
                      steps[0].icon
                    ) : s.active ? (
                      <ActiveIcon color="#43d7b4" height={6} width={6} />
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    className={`${
                      s.active || s.completed
                        ? "hidden w-full h-0.5 mt-3 sm:flex bg-primary-500 -z-1000"
                        : "bg-gray-500 hidden w-full h-0.5 mt-3 sm:flex"
                    }`}
                  ></div>
                  <div
                    className={
                      `${
                        s.active && !s.completed
                          ? "text-primary-500"
                          : "text-gray-400"
                      }` && `${"w-full mt-4 sm:pr-8"}`
                    }
                  >
                    {s.title}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
