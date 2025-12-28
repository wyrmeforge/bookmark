import { api } from "@convex/api";
import { useQuery } from "convex/react";
import { useMemo } from "react";
import { MEDIA_STATUS_FILTERS } from "@/shared/config";
import { useAppState } from "@/shared/lib";
import type { UseFiltersReturn } from "./types";

export const useFilters = (): UseFiltersReturn => {
  const { currentFilter, updateFilter } = useAppState();
  const moduleList = useQuery(api.lists.getListModulesCount);

  const menu = useMemo(() => {
    return MEDIA_STATUS_FILTERS.map(({ key, label, icon: Icon, color }) => ({
      key,
      title: label,
      icon: <Icon size={16} />,
      color,
      value: moduleList?.[key] ?? 0,
    }));
  }, [moduleList]);

  return { menu, currentFilter, updateFilter };
};
