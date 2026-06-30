import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

type CustomerFormBtnProps = {
  actionType: "add" | "edit";
  disabled: boolean
};

export default function CustomerFormBtn({ actionType, disabled }: CustomerFormBtnProps) {
  return (
    <Button type="submit" disabled={disabled}>
      {disabled
        ? <Spinner />
        : actionType === "edit"
          ? "Save changes"
          : "Add Customer"}
    </Button>
  );
}
