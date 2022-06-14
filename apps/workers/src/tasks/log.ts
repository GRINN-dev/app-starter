import { Task } from "graphile-worker";
import chalk from "chalk";

export const log: Task = async payload => {
  console.log(
    chalk.blue.bgWhite(
      "========================================================================================="
    )
  );
  console.log(chalk.blue.bgWhite("Debugging Postgres :"));
  console.log(payload);
  console.log(
    chalk.blue.bgWhite(
      "========================================================================================="
    )
  );
};
