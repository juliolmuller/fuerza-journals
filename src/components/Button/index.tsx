import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Input({ children, className, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={`custom-button ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Input;
