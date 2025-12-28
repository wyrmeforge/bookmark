"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full items-center justify-center gap-4">
      <h2>Щсь пішло не так!</h2>
      <button onClick={() => reset()} type="button">
        Спробуйте ще раз
      </button>
    </div>
  );
}
