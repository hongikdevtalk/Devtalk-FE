type ButtonProps = {
  variant?: 'home' | 'default' | 'sub' | 'disabled' | 'custom';
  text: string;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ variant = 'default', text, onClick, className }: ButtonProps) => {
  const baseStyle = 'w-[335px] h-[48px] rounded-80 subhead-1-semibold cursor-pointer';

  const variantStyles = {
    home: 'button-gradient text-white',
    default: 'graphic-gradient-light text-black',
    sub: 'bg-grey-600 text-white',
    disabled: 'bg-grey-700 text-grey-500',
    custom:
      'bg-[radial-gradient(ellipse_171.17%_557.08%_at_74.62%_100%,_#ADE657_0%,_#4CBCA5_100%)] text-white',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className ?? ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
