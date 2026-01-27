import { Radio, RadioGroup, RadioIndicator } from "@/registry/brook/tailwind/ui/radio";

export default function RadioDemo() {
  return (
    <div className="max-w-96">
      <RadioGroup aria-label="Select a size">
        <div className="mb-4 font-medium text-sm leading-normal">How was your experience?</div>

        <label className="flex items-center gap-2 text-sm leading-normal cursor-pointer">
          <Radio value="pleasant">
            <RadioIndicator />
          </Radio>
          Pleasant
        </label>

        <label className="flex items-center gap-2 text-sm leading-normal cursor-pointer">
          <Radio value="neutral">
            <RadioIndicator />
          </Radio>
          Neutral
        </label>

        <label className="flex items-center gap-2 text-sm leading-normal cursor-pointer">
          <Radio value="unpleasant">
            <RadioIndicator />
          </Radio>
          Unpleasant
        </label>
      </RadioGroup>
    </div>
  );
}
