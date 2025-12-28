import clsx from "clsx";
import Image from "next/image";

const Loader = ({ variant = "fixed" }) => {
  const isFixedVariant = variant === "fixed";

  return (
    <div
      className={clsx({
        "fixed top-0 left-0 z-50 w-screen bg-stone-950/80": isFixedVariant,
      })}
    >
      <Image
        alt="Cat Running in Circle :D"
        className={clsx(
          "top-1/2 left-1/2 inline-block h-40 w-40 -translate-x-1/2 -translate-y-1/2",
          {
            "!fixed": isFixedVariant,
            absolute: !isFixedVariant,
          }
        )}
        height={70}
        priority
        role="status"
        src="https://i.gifer.com/2iFb.gif"
        width={150}
      />
    </div>
  );
};

export { Loader };
