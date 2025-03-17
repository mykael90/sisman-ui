interface ButtonNavBarProps {
  children?: React.ReactNode;
  onClick?: () => void;
  title?: string;
}

const ButtonNavBar: React.FC<ButtonNavBarProps> = ({
  children,
  onClick,
  title,
  ...rest
}) => {
  const buttonClasses = `
    cursor-pointer
    gap-2
    items-center
    rounded-sm
    p-2
    rounded-md
    text-sm
    font-medium
    transition-colors
    focus:outline-none
    hover:bg-gray-200
    dark:hover:bg-gray-700
  `;

  return (
    <button onClick={onClick} title={title} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default ButtonNavBar;
