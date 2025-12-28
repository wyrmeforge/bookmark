import { z as u } from "zod";
import { convexMediaStatusValues } from "@/entities/media/model/convex/constants";

export const ModifyFormSchema = u.object({
  unity_info: u.object({
    id: u.number(),
    name: u.string().min(1, "Поле обов'язкове"),
    image: u.string().min(1, "Поле обов'язкове"),
    bannerImage: u.string().optional(),
    episodes: u.number().optional(),
  }),
  name: u.string().optional(),
  viewedCount: u.number().optional(),
  website: u.string().optional(),
  rate: u.number().optional(),
  status: u.enum(convexMediaStatusValues),
  isFavorite: u.boolean().optional(),
  episode: u.number().optional(),
  comment: u.string().optional(),
});

export type TMediaModifyFormValues = u.infer<typeof ModifyFormSchema>;

export const formDefaultValues = {
  unity_info: {
    id: 0,
    name: "",
    image: "",
    bannerImage: "",
    episodes: undefined,
  },
  name: "",
  viewedCount: undefined,
  rate: undefined,
  status: "scheduled",
  isFavorite: false,
  episode: undefined,
  website: "",
  comment: "",
} as const satisfies TMediaModifyFormValues;
