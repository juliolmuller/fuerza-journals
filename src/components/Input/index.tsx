import { InputHTMLAttributes } from 'react';
import './styles.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ id, label, value, ...props }: InputProps) {
  const inputId = id ?? `input-${Math.round(Math.random() * 1000)}`;

  return (
    <div className="custom-input">
      <input id={inputId} value={value} {...props} />
      <label htmlFor={inputId} className={String(value) && 'has-content'}>
        {label}
      </label>
    </div>
  );
}

export default Input;
