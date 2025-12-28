"use client";

import { useInfiniteScroll } from "@/shared/lib";
import { Loader } from "@/shared/ui/loader";
import { Skeleton } from "@/shared/ui/skeleton";
import { useMediaList } from "../model";
import { EmptyListPlaceholder } from "./components/empty-list-placeholder";
import { MediaCard } from "./media-card";

const MediaList = () => {
  const {
    list,
    isFirstLoading,
    isLoadingMore,
    loadMore,
    currentFilter,
    isEndOfPages,
  } = useMediaList();

  const loadMoreFn = () => loadMore(20);

  const sentinelRef = useInfiniteScroll(
    loadMoreFn,
    isLoadingMore,
    isEndOfPages
  );

  if (isFirstLoading) return <Loader variant="absolute" />;

  if (!list?.length)
    return <EmptyListPlaceholder currentFilter={currentFilter} />;

  return (
    <div className="grid grid-cols-2 flex-col justify-center gap-4 pt-16 pb-[100px] md:grid md:grid-cols-container md:pt-0 md:pr-2 md:pb-4">
      {list.map((item, idx) => (
        <MediaCard itemIdx={idx} key={item._id} mediaData={item} />
      ))}
      {!isEndOfPages && (
        <div
          className="col-span-2 flex w-full items-center justify-center md:col-auto"
          ref={sentinelRef}
        >
          {isLoadingMore && <Skeleton className="h-full w-full" />}
        </div>
      )}
    </div>
  );
};

export { MediaList };
