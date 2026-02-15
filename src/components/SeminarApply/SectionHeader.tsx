type SectionHeaderProps = {
  title: string;
  required?: boolean;
  helperText?: string;
  className?: string;
};

export const SectionHeader = ({
  title,
  required,
  helperText,
  className = '',
}: SectionHeaderProps) => (
  <div className={`flex flex-col gap-4 ${className}`}>
    <div className="flex items-center gap-4">
      <p className="heading-3-semibold text-white">{title}</p>
      {required && <p className="heading-3-semibold text-gradient">*</p>}
    </div>
    {helperText && <p className="body-2-medium text-grey-300">{helperText}</p>}
  </div>
);
