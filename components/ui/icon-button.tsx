import { MouseEventHandler } from "react";

import { cn } from "@/lib/utils";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
    disabled
}) => {
  return ( 
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={cn(
        'rounded-full flex items-center justify-center bg-white dark:bg-gray-900 border dark:border-black/40 shadow-lg dark:shadow-black p-2 hover:scale-110 transition',
        className,
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {icon}
    </button>
   );
}

export default IconButton;