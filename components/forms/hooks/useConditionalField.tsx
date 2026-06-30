import * as React from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
  useWatch,
} from "react-hook-form";

type UseConditionalFieldProps<
  TFormValues extends FieldValues,
  TWatchName extends Path<TFormValues>,
  TResetName extends Path<TFormValues>,
> = {
  form: UseFormReturn<TFormValues>;
  watchName: TWatchName;
  expectedValue: PathValue<TFormValues, TWatchName>;
  resetName: TResetName;
  resetValue?: PathValue<TFormValues, TResetName>;
};

export function useConditionalField<
  TFormValues extends FieldValues,
  TWatchName extends Path<TFormValues>,
  TResetName extends Path<TFormValues>,
>({
  form,
  watchName,
  expectedValue,
  resetName,
  resetValue,
}: UseConditionalFieldProps<TFormValues, TWatchName, TResetName>) {
  const watchedValue = useWatch({
    control: form.control,
    name: watchName,
  });

  React.useEffect(() => {
    if (watchedValue !== expectedValue) {
      form.setValue(
        resetName,
        (resetValue ?? "") as PathValue<TFormValues, TResetName>,
        {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        },
      );
      form.clearErrors(resetName);
    }
  }, [watchedValue, expectedValue, resetName, resetValue, form]);

  return watchedValue === expectedValue;
}
