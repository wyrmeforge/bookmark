"use client";

import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  onLoadMore: () => void,
  isLoading: boolean,
  isEnd: boolean
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isLoading || isEnd) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) onLoadMore();
      },
      { rootMargin: "100px" }
    );

    const el = ref.current;
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [isLoading, isEnd, onLoadMore]);

  return ref;
};
