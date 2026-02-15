import { Switch } from '@headlessui/react';

interface ToggleSwitchPrps {
  isEnabled: boolean;
  onToggle: (newStatus: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch = ({ isEnabled, onToggle, disabled = false }: ToggleSwitchPrps) => {
  return (
    <Switch
      checked={isEnabled}
      onChange={onToggle}
      disabled={disabled}
      className="group relative flex items-center w-[44px] h-[22px] cursor-pointer rounded-16 bg-grey-500 
            duration-300 ease-in-out data-checked:bg-green-500"
    >
      <span
        aria-hidden="true"
        className="w-[18px] h-[18px] translate-x-[2px] rounded-full bg-white shadow-lg duration-300 ease-in-out group-data-checked:translate-x-[24px]"
      />
    </Switch>
  );
};

export default ToggleSwitch;
