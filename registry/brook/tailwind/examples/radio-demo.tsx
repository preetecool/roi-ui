import {
  Radio,
  RadioGroup,
  RadioIndicator,
} from "@/registry/brook/tailwind/ui/radio";

export default function RadioDemo() {
  return (
    <div className="max-w-96">
      <RadioGroup aria-label="Select a size">
        <div className="mb-4 font-medium text-sm">How was your experience?</div>

        <div className="flex items-center gap-2">
          <Radio id="pleasant" value="pleasant">
            <RadioIndicator />
          </Radio>
          <label className="cursor-pointer text-sm" htmlFor="pleasant">
            Pleasant
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Radio id="neutral" value="neutral">
            <RadioIndicator />
          </Radio>
          <label className="cursor-pointer text-sm" htmlFor="neutral">
            Neutral
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Radio id="unpleasant" value="unpleasant">
            <RadioIndicator />
          </Radio>
          <label className="cursor-pointer text-sm" htmlFor="unpleasant">
            Unpleasant
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
