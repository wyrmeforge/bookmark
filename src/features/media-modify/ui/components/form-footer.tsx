import { Button } from "@/shared/ui/button";
import { DialogClose, DialogFooter } from "@/shared/ui/dialog";

interface IFormFooterProps {
  isCreateForm: boolean;
}

export const FormFooter = ({ isCreateForm }: IFormFooterProps) => (
  <DialogFooter className="sticky bottom-0 flex flex-row gap-2 border-muted border-t bg-background p-4">
    <DialogClose
      className="w-full rounded-md border border-muted px-4 py-2 font-medium text-sm transition-colors hover:text-red-800"
      type="button"
    >
      Скасувати
    </DialogClose>
    <Button className="w-full" type="submit">
      {isCreateForm ? "Додати" : "Змінити"}
    </Button>
  </DialogFooter>
);
