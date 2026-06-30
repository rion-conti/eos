import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function applyServerErrors<T extends FieldValues>(
  errors: Record<string, string[] | undefined>,
  setError: UseFormSetError<T>
) {
  Object.entries(errors).forEach(([field, messages]) => {
    if (!messages) return;

    setError(field as Path<T>, {
      type: "server",
      message: messages[0],
    });
  });
}
