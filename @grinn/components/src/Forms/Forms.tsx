import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormsProps } from "./types";

export const Forms: FC<FormsProps> = ({
  children,
  defaultValues,
  onSubmit,
}) => {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="font-ApfelGrotezk"
      >
        {children}
      </form>
    </FormProvider>
  );
};
