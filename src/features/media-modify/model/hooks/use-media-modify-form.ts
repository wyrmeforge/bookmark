import { useEffect } from "react";

interface IUseMediaModifyFormLifecycleProps {
  isSubmitSuccessful: boolean;
  isDialogOpen: boolean;
  reset: () => void;
}

export function useMediaModifyFormLifecycle({
  isSubmitSuccessful,
  isDialogOpen,
  reset,
}: IUseMediaModifyFormLifecycleProps) {
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (!isDialogOpen) {
      reset();
    }
  }, [isDialogOpen, reset]);
}
