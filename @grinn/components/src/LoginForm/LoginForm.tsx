import { LogoIcon } from "@grinn/icons";
import { FC } from "react";
import { Button, Card, Typography } from "..";
import { LoginFormProps } from "./";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="flex flex-col justify-center min-h-full py-12 font-ApfelGrotezk sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center w-full">
          <LogoIcon className="w-32 h-32 text-accent-500" />
        </div>
        <Typography
          as="h2"
          size="3xl"
          weight="bold"
          color="primary"
          className="mt-6 text-center"
        >
          Connectez-vous à votre compte
        </Typography>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="text" // type="email"
                  autoComplete="email"
                  className={`${
                    errors.email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-indigo-500 focus:border-indigo-500"
                  } block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none  sm:text-sm`}
                  {...register("email", {
                    required: {
                      message: "L'email est obligatoire",
                      value: true,
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Merci d'entrer un email valide",
                    },
                  })}
                />
                <Typography className="text-red-500">
                  {errors.email?.message}
                </Typography>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                <Typography size="sm">Mot de passe</Typography>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={`${
                    errors.password
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-indigo-500 focus:border-indigo-500"
                  } block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none  sm:text-sm`}
                  {...register("password", {
                    required: {
                      message: "Le mot de passe est obligatoire",
                      value: true,
                    },
                    minLength: {
                      message:
                        "Votre mot de passe doit faire 8 caractères minimum",
                      value: 8,
                    },
                  })}
                />
                <Typography className="text-red-500">
                  {errors.password?.message}
                </Typography>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div className="flex justify-center w-full">
              <Button as="button" type="submit">
                Connexion !
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  Ou continuez avec :
                </span>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="OUTLINED" type="button">
                <FcGoogle />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
