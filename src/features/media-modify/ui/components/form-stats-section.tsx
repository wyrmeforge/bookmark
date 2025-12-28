import { FormStepperInput } from "@/shared/ui/form-number-input";

interface IMediaStatsSectionProps {
  animeEpisodes?: number;
}

export const FormStatsSection = ({
  animeEpisodes,
}: IMediaStatsSectionProps) => (
  <div className="space-y-3 rounded-lg bg-muted/30 p-4">
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <FormStepperInput
        hideMaxValue
        label="Разів переглянуто"
        max={100}
        min={0}
        name="viewedCount"
      />
      <FormStepperInput label="Оцінка" max={10} min={0} name="rate" />
      <FormStepperInput label="Серій" max={animeEpisodes} name="episode" />
    </div>
  </div>
);
