import { useEffect, useState } from "react";

export const useItemsPerPage = () => {
  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 600;

  const [items, setItems] = useState(0);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const itemsPerRow = Math.max(1, Math.floor(w / CARD_WIDTH));
      const rows = Math.max(2, Math.ceil(h / CARD_HEIGHT) - 1);

      setItems(itemsPerRow * rows);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return items;
};
