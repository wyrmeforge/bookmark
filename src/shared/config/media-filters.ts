import {
  AlarmClockIcon,
  CalendarXIcon,
  CheckCheckIcon,
  EyeIcon,
  GoalIcon,
  HeartIcon,
  type LucideProps,
  SwordIcon,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { TMediaStatus } from "@/entities/media/model/convex/constants";

type IconComponent = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

interface ColorClasses {
  bg: string;
  border: string;
  text: string;
}

export interface IMediaStatusFilterItem {
  key: TMediaStatus;
  label: string;
  icon: IconComponent;
  color: ColorClasses;
}

export const MEDIA_STATUS_FILTERS: readonly IMediaStatusFilterItem[] = [
  {
    key: "all",
    label: "Всі",
    icon: SwordIcon,
    color: {
      bg: "bg-indigo-700",
      border: "border-indigo-700",
      text: "text-indigo-700",
    },
  },
  {
    key: "watching",
    label: "Дивлюсь",
    icon: EyeIcon,
    color: {
      bg: "bg-lime-700",
      border: "border-lime-700",
      text: "text-lime-700",
    },
  },
  {
    key: "scheduled",
    label: "Заплановано",
    icon: GoalIcon,
    color: {
      bg: "bg-blue-800",
      border: "border-blue-800",
      text: "text-blue-800",
    },
  },
  {
    key: "postponed",
    label: "Відкладено",
    icon: AlarmClockIcon,
    color: {
      bg: "bg-yellow-700",
      border: "border-yellow-700",
      text: "text-yellow-700",
    },
  },
  {
    key: "abandoned",
    label: "Закинуто",
    icon: CalendarXIcon,
    color: {
      bg: "bg-red-900",
      border: "border-red-900",
      text: "text-red-900",
    },
  },
  {
    key: "completed",
    label: "Завершено",
    icon: CheckCheckIcon,
    color: {
      bg: "bg-green-700",
      border: "border-green-700",
      text: "text-green-700",
    },
  },
  {
    key: "favorite",
    label: "Улюблені",
    icon: HeartIcon,
    color: {
      bg: "bg-pink-800",
      border: "border-pink-800",
      text: "text-pink-800",
    },
  },
];
