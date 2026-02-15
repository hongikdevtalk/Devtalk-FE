import { Switch } from '@headlessui/react';

interface ToggleFieldProps {
  fieldName: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleField = ({ fieldName, isEnabled, onToggle }: ToggleFieldProps) => {
  return (
    <div
      className="w-full min-w-[650px] mx-auto h-[82px] bg-grey-900 p-6 rounded-10 
      flex flex-row gap-24 items-center"
    >
      <h2 className="heading-2-bold text-white">{fieldName}</h2>

      <Switch
        checked={isEnabled}
        onChange={onToggle}
        className="group relative flex items-center w-[44px] h-[22px] cursor-pointer rounded-16 bg-grey-500 
        ease-in-out data-checked:bg-green-500"
      >
        <span
          aria-hidden="true"
          className="w-[18px] h-[18px] translate-x-[2px] rounded-full bg-white shadow-lg 
          duration-300 ease-in-out group-data-checked:translate-x-[24px]"
        />
      </Switch>
    </div>
  );
};

export default ToggleField;
